const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const mongoose = require("mongoose");




exports.createratingAndReview = async(req , res) => {
    try{
            const userId = req.user.id;
            const {rating , review , courseId} = req.body;
            // ussr enroll or not
            const courseDetails = await Course.findOne({_id:courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId} }},
                );


                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:"Student is  NOT enrolled"
                      })
                    }

                    // check if aklreday review
                    const alreadyReview = await RatingAndReview.findOne({
                        user:userId,
                        course:courseId,
                    })

                    if(alreadyReview) {
                        return res.status(403).json({
                            success:false,
                            message:"Course is already reviewed by user "
                          })
                        }


                    // save rat n rev
                    const ratingReview = await RatingAndReview.create({
                        rating, review , 
                        course:courseId,
                        user:userId,
                    })

                    // update to course

               const updatedCourseDetails  =    await Course.findByIdAndUpdate({_id:courseId} , {
                        $push: {
                            ratingAndReviews : ratingReview._id,
                        }
                    }, {new:true})

                    console.log(updatedCourseDetails);

                    return res.status(200).json({
                        success:true,
                        message:"rating and review created succesfully",
                        ratingReview
                      })
                    }                
     catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"rating and review can`t created"
          })
        }
    }


exports.getAvgRating = async (req , res) => {
    try{
        // get course id
        const courseId = req.body.courseId;
        // calc avg rating
          const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course: new mongoose.Types.ObjectId(courseId),

                },
            },
            {
                $group : {
                    _id:null,
                    AvgRating:{$avg: "$rating"},
                }
            }
          ])
        // return rating
        if(result.length > 0){
        return res.status(200).json({
            success:true,
            message:result[0].AvgRating,
          })
        }
        // if no rating review
       
        return res.status(200).json({
            success:true,
            message:"rating and review is zero for this course",
            AvgRating:0,
          })
    
    }catch(err) {
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"rating and review can`t created"
          })

    }
}    


// getallrating n rev

exports.getAllRatingAndReview = async(req , res) => {
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({path:"user",
                   select:"firstName lastName email image" })
                   .populate({
                    path:"course",
                    select:"courseName"
                   })
                   .exec();

    }catch(err) {
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"rating and review can`t fetched"
          })
    }
}

