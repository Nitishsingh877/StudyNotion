const Course = require("../models/Course");
const Category  = require("../models/Category");
const User = require("../models/User")
const SubSection = require("../models/Subsection")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();



// create course

exports.createCourse = async (req, res) => {
    try{
//    get data from body n file
  const {courseName,
    courseDescription,
    whatYouWillLearn, 
    price,
    category,
    status,
    instructions: _instructions,
    tag: _tag} = req.body;
  const thumbnail = req.files.thumbnailImage;


  const tag = JSON.parse(_tag)                                    //Convert the tag and instructions from stringified Array to Array
  const instructions = JSON.parse(_instructions)

   // Check if any of the required fields are missing
   if(!courseName || !courseDescription || !whatYouWillLearn || !price ||  !tag.length ||  !thumbnail || !category ||  !instructions.length) {
    return res.status(400).json({success: false,
       message: "All Fields are Mandatory", })
 }
        if(!status || status === undefined){
        status = "Draft"
        }
//   chek for instructor
   const userId = req.user.id;
   const instructorDetails = await User.findById(userId , {
    accountType:"Instructor"
   });
   console.log(instructorDetails);


     if(!instructorDetails) {
        return res.status(404).json({
            success:false,
            message:"instructir details not found"
        })
     }


    //  check tag
    // console.log(" all good")

    const CategoryDetails = await Category.findById(category);
    if(!CategoryDetails) {
         return res.status(404).json({
            success:false,
            message:'Category  details not found',
         })
    }

    // ipload image to cloudinary

    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

    // create in db

    const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag,
        Category:CategoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
        status: status,
        instructions,
    })

    // user update
    await User.findByIdAndUpdate({_id: instructorDetails._id}, {
        $push:{
            courses:newCourse._id,
        }
    }, {new:true})


    // update tag schema
    await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
    // to do pending

    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate( { _id: category },  {$push: {courses: newCourse._id,},}, { new: true } )

    return res.status(200).json({
        success:true,
        message:"course addded succesfully",
        data:newCourse,
    })

}
catch(err) {
  console.log(err);
  return res.status(400).json({
    success:false,
   message:"error in creating"
  })
}
}


// edit course details



// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if(!course){
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if(req.files){
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary( thumbnail,  process.env.FOLDER_NAME )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for(const key in updates) {
      if(updates.hasOwnProperty(key)) {
        if(key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()                                     // save the course;

    const updatedCourse = await Course.findOne({ _id: courseId,})
                          .populate({
                            path: "instructor",
                            populate: {
                              path: "additionalDetails",
                            },
                          })
                          .populate("category")
                          .populate("ratingAndReviews")
                          .populate({
                            path: "courseContent",
                            populate: {
                              path: "subSection",
                            },
                          })
                          .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// get all courses

exports.showAllCourses = async (req,res) => {
    try{
       const allCourses = await Course.find({} , {
        courseName:true,
        price:true,
        thumbnail:true,
        instructor:true,
        ratingAndReviews:true,
        studentsEnrolled:true,
       })
       .populate("instructor")
       .exec();


       return res.status(200).json({
        success:true,
        message:"data for all courses fetched succesfully",
        data:allCourses,
       })
    }catch(err){
        console.log(err);
        return res.status(400).json({
          success:false,
          message:"cant fetch data"
        })
    }
}


exports.getCourseDetails = async(req , res) => {
  try{
     const {courseId} = req.body;

     const courseDetails = await Course.find({_id:courseId}).populate({
      path:"instructor",
      populate:{
        path:"additionalDetails"
      }
     }).populate("category")
        //.populate("rattingAndReviews")
        .populate({
          path:"courseContent",
          populate:{
            path:"subSection",
            select:"-videoUrl"
          }
        })
        .exec()

        // validation
        if(!courseDetails) {
          return res.status(400).json({
            success:false,
            message:"Course DEATILS NOT FOUND"
          })
        }

        return res.status(200).json({
          success:true,
          message:"Course Drtails fetched succesfully",
          courseDetails

        })
  }catch(err) {
    console.log(err);
    return res.status(400).json({
      success:false,
      error:err.message,
    })
  }
  }
