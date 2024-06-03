const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const Course = require("../models/Course")

exports.createSection = async (req, res) => {
    try {
    // data fetch
    const {sectionName, courseId} = req.body;
    // validate
    if(!sectionName || !courseId) {
        return res.status(400).json({
            success:false,
            message:"fill all the details"
        });
    }
//   console.log("all good")
    // create sec
    const newSection = await Section.create({sectionName})
   

    const updatedCourseDetails = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            courseContent: newSection._id,
          },
        },
        { new: true }
      )
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()

    // console.log("not good")
    // return res
    return res.status(200).json({
        success:true,
        message:"Section created Succesfully",
        updatedCourseDetails,

    })

    
    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Section can`t added",
            error:err.message
        })

    }
}


// update
 exports.updateSection = async (req,res) => {
    try {

        // data 
        const {sectionName, sectionId, courseId} = req.body;
        // valid
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"fill all the details"
            });
        }
        // update
        const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();


		res.status(200).json({
			success: true,
			message: "Section updated successfully",
			updatedCourse,
        })

        

    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Section can`t updated",
        })
    }
 }


//  deletesec

exports.deleteSection = async (req, res) => {
    try{
        // get id
         const {sectionId, courseId} = req.body;
        // findndel
        await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        // retyrn res
        return res.status(200).json({
            success:true,
            message:"Section deleted Succesfully",
    
        })


    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Section can`t deleted",
    })
}
}