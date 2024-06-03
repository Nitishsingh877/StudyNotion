const SubSection = require("../models/Subsection")
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Course = require("../models/Course");


// create sub sec
exports.createSubSection = async (req,res) => {
    try{
    //    get data
    const{sectionId , title , timeDuration , description} = req.body;
    // extract file
    const video = req.files.videoFile;
    // validate
    if(!sectionId || !title || !timeDuration || !description || !video) {
        return res.status(400).json({
            success:false,
            message:"fill all the details"
        });
    }
    // upload to cloudinary
      const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
    // create kro
    const subSectionDetails = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
    })
    // push in section
    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId} , {$push:{
        subSection:SubSection._id,
    }}, {new:true}).populate("subSection");

    // populate n exce hw
    const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
    // retun res
    return res.status(200).json({
        success:true,
        message:"SubSection created Succesfully",
        updatedCourse,

    })
    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"SubSection can`t created",
        })
    }
}
// update
exports.updateSubSection = async (req,res) => {
    try {

        // Extract necessary information from the request body
		const { SubsectionId, title , description,courseId } = req.body;
		const video = req?.files?.videoFile;

		
		let uploadDetails = null;
		// Upload the video file to Cloudinary
		if(video){
		 uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_VIDEO
		);
		}
         // Create a new sub-section with the necessary information
		const SubSectionDetails = await SubSection.findByIdAndUpdate({_id:SubsectionId},{
			title: title || SubSection.title,
			// timeDuration: timeDuration,
			description: description || SubSection.description,
			videoUrl: uploadDetails?.secure_url || SubSection.videoUrl,
		},{ new: true });

        const updatedCourse = await Courses.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
		// Return the updated section in the response
		return res.status(200).json({ success: true, data: updatedCourse });


    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"SubSection can`t updated",
        })
    }
}


// delete


exports.deleteSubSection = async (req , res) => {
    try{
        // get id
        const{subSectionId , courseId} = req.body;
        const sectionId=req.body.sectionId;
	if(!subSectionId || !sectionId){
		return res.status(404).json({
            success: false,
            message: "all fields are required",
        });
	}

    const ifsubSection = await SubSection.findById({_id:subSectionId});
	const ifsection= await Section.findById({_id:sectionId});
	if(!ifsubSection){
		return res.status(404).json({
            success: false,
            message: "Sub-section not found",
        });
	}
	if(!ifsection){
		return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
        // findndel
        await SubSection.findByIdAndDelete(subSectionId);
        await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});



	      const updatedCourse = await Courses.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();


	return res.status(200).json({ success: true, message: "Sub-section deleted", data: updatedCourse });


        
          



    }catch(err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Section can`t deleted",
    })
}
}

