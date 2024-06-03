const User = require('../models/User');
const OTP = require("../models/OTP");
const otpGenrator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/PasswordUpdate");
const Profile = require("../models/Profile");

require("dotenv").config();




// sendOTP

exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;

    const CheckUserPresent = await User.findOne({email});

    if(CheckUserPresent) {
        return res.status(401).json({
            success:false,
            message:"user alreday Registerd"
        })
    }
    

    // gen otp
   var otp = otpGenrator.generate(6 , {
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
   })

   console.log("otp genrated" , otp);


//    check unique otp or not

 let result = await OTP.findOne({otp:otp});

  while(result) {
    otp = otpGenrator(6 , {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
     result = await OTP.findOne({otp:otp});
  }

    const otpPayLoad ={email , otp};

    //  create an entry
    const otpBody = await OTP.create(otpPayLoad);
    console.log(otpBody);

    res.status(200).json({
        success:true,
        message:"OTP sent succesfully",
        otp,
    })
    }


   catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Can`t genrate otp"
        })
   }
}


// signup


exports.signup = async (req, res) => {
    

try{
    // data fetch from req body
    const 
    {firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp} = req.body;
    // validate from db
    if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp ) {
        return res.status(400).json({
           success:false,
           message:"Please fill all the entry"
        })
    }
    // 2 password match
     if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Confirm Password Does not Matched"
        })
     }

    // exist or not 

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            success:false,
            message:"User alreday Exist Kindly Login"
        })
    }

    // most recent otp

    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log("otp" , recentOtp);
    // validate n successs

    // if(recentOtp.length == 0){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Please Enter The OTP"
    //     })
    // }
       if(otp !== recentOtp[0].otp) {
        return res.status(400).json({
            success:false,
            message:"OTP not matched"
        })
      }


    // password hash
      const hashedPassword = await bcrypt.hash(password , 10);

    // create entry

    const  profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        contactNumber,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`


    })
    // res.success

    return res.status(200).json({
        success:true,
        message:"USer Created Succesfully",
        user
    })

    



}catch(err){
   
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"USer Cannot be Registerd please try again"
    })
}
}




// login


exports.login = async (req, res) => {
  try{
    //    get data from body
     const {email,password} = req.body;

    // validation data
     if(!email || !password) {
        return res.status(403).json({
            success:false,
            message:"ALL fields are required please fill all"
        })
     }
    // user exist or not
    const user = await User.findOne({email}).populate("additionalDetails");

    if(!user) {
        return res.status(401).json({
            success:false,
            message:"USER not registerd Signup first"
        })
    }
    // gen JWT after password matching
    if (await bcrypt.compare(password, user.password)){
       const  payload ={
        email:user.email,
        id:user._id,
        accountType:user.accountType,
       }
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        user.token = token;
        user.password = undefined;
    
    // create Cookie n send response
    const options ={
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
    }
    res.cookie("token", token, options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in succesfully",
    })
}
    else {
         return res.status(401).json({
            success:false,
            message:"Password is incorrect"
         })
    }
  
}
 
  catch(err){
         console.log(err);
         return res.status(404).json({
            success:false,
            message:"Login failure"
         })
  };
}


// changePassword


exports.changePassword = async (req,res) => {
   try{
    
    const userDetails = await User.findById(req.user.id);
   
     // get data from body
     const {oldPassword, newPassword} = req.body;
      
     const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password)

     if(!isPasswordMatch) {
        return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

        if(oldPassword === newPassword) {
            return res.status(401).json ({
                success:false,
                message:"old and current can`t be same"
            })
        }

   
 
  
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     // update in db

    const updatedUserdetails = await User.findByIdAndUpdate(req.user.id, {
        password:hashedPassword
       },{new:true})



    //    mail send
    try {                                                          // Send notification email , here passwordUpdated is template of email which is send to user;
        const emailResponse = await mailSender(updatedUserdetails.email,
         passwordUpdated(updatedUserdetails.email, `Password updated successfully for
         ${updatedUserdetails.firstName} 
         ${updatedUserdetails.lastName}`));


        console.log("Email sent successfully:", emailResponse.response);
       } 
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
        });
    }
     // return res
     return res.status(200).json({
         success:true,
         message:"Password Changed Succesfully"
     })
   }
   catch(err){
    return res.status(404).json({
        success:false,
        message:"Error in chnaging password",
        error: err.message,
    })
   }
}

