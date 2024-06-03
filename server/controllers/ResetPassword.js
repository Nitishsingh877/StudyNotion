const { TokenExpiredError } = require('jsonwebtoken');
const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req , res) => {
    try{
    // get email
    const email = req.body.email;
    // validate email
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(402).json({
            success:false,
            message:"USer not registerd with us"
        })
    }
    // gen token
    const token = crypto.randomUUID();
    // update user  by adding token
    const updatedDetails = await User.findOneAndUpdate({email: email}, {
        token:token,
        resetPasswordExpires:Date.now() + 5*60*1000,
    },{new:true})


    //create  n send  mail
    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(email , "Password Reset Link" , `Your Link for email verification is ${url}. Please click this url to reset your password.`);


  // return  response

  return res.status(200).json({
    success:true,
    message:"Email sent Succesfully PLase check mail"
  })
}catch(err){
         console.log(err);
         return res.status(404).json({
            success:false,
            message:"something went wrong while reset pwd link "
         })
    }
}


// reset password

exports.resetPassword = async (req, res) => {
   try{
          // data fetch
    const { password, confirmPassword, token} = req.body;
    // validation
    if(password !== confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching"
        })
    }
    // grt user details  using token
    const userDetails = await User.findOne({token: token});
    // if not found invalifd token or expires
    if(!userDetails) {
        return res.json({
            success:false,
            message:"token is invalid"
        });
    }
    if(!(userDetails.resetPasswordExpires > Date.now())){
      return res.json({
        success:false,
        message:"token is expired please re-gen your link"
      })
    }

    // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
    //updated pass
    await User.findOneAndUpdate({token:token} , {password:hashedPassword}, {new:true})

    // return res

    return res.status(200).json({
        success:true,
        message:"password reset succesfuly"
    })

}
   catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:"reset password failed"
    })
   }
}