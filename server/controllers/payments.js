const {instance} = require("../config/razorpay");
const Course = require("../models/Courses");
const User = require("../models/User")
const mailSender = require('../utils/nodemailer');
const {courseEnrollmentEmail} = require("../mail/courseEnrollmentEmail");


// capture payment n init

exports.capturePayment = async (req , res) => {
//    get cid n userid
const {course_id} = req.body;
const userId = req.user.id;
// valid cid n id
if(!course_id) {
    return res.json({success:false,
         message:"Please provide Course Id"});
}




let course;
try{
    course = await Course.findById(course_id);
    if(!course) {
        return res.status(200).json({success:false, message:"Could not find the course"});
    }
// user already paid?
    const uid  = new mongoose.Types.ObjectId(userId);
    if(course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({success:false, message:"Student is already Enrolled"});
    }
}
catch(error){
    console.log(error);
    return res.status(500).json({success:false, message:error.message});
}

// order create
const totalAmount = course.price;
const currency = "INR";


const options = {
    amount: totalAmount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
        courseId : course_id,
        userId,
    }
}
// return response

try{
    const paymentResponse = await instance.orders.create(options);
    res.json({
        success:true,
        message:paymentResponse,
        orderId:paymentResponse.id,
    })
}
catch(error) {
    console.log(error);
    return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
}
};

//verify the payment
// exports.verifyPayment = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const userId = req.user.id;

//     if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
//            return res.status(200).json({success:false, message:"Payment Failed"});   
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if(expectedSignature === razorpay_signature) {
//             await enrollStudents(courses, userId, res);                   //enroll karwao student ko
//             return res.status(200).json({success:true, message:"Payment Verified"});    //return res
//         }
//         return res.status(200).json({success:"false", message:"Payment Failed"});
// }

exports.verifySignnature = async(req , res) => {
    const webHookSceret = "12345678";
    
    const  signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256" , webHookSceret)
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");


    if(signature == digest) {
        console.log("payment is authorised");

        const {courseId , userId} = req.body.payload.payment.entity.notesl;

        try{
        //   action fulfil 

         // find course n enroll
        const enrolledcourse = await Course.findOneAndUpdate({_id:courseId} , {$push:{studentsEnrolled:userId}},{new:true});
       

         if(!enrolledcourse) {
            return res.status(500).json({
                success:false,
                message:"Course not found"
            });
         }

         console.log(enrolledcourse);

        //  student update

        const enrolledStudent = await User.findOneAndUpdate({_id:userId}, {
            $push:{courses:courseId}
        } , {new:true});

        console.log(enrolledStudent);


        // mail send

        const emailresponse = await mailSender(
            enrolledStudent.email,
            "congratulattions you are onboarded",
            "congo man stdy hard"
        )

        return res.status(200).json({
            success:true,
            message:"sign verifief m coyrse added"
        })

        }catch(err) {
         console.log(err);
         return res.status(500).json({
              success:false,
              message:"failed in verify signature"
         })
        }
    }

    else {
        return res.status(400).json({
            success:false,
            message:"signature fauled",
        })
    }
}



