const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


//auth
exports.auth = async (req , res , next) => {
    try{
        //  extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer " , "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        // verify token

        try{
           const decode = await jwt.verify(token, process.env.JWT_SECRET);
           console.log(decode);
           req.user = decode;
        }catch(err) {
         return res.status(401).json({
            success:false,
            mesaage:"Token is invalid"
         })
        }
        next();
    }catch(err) {
       return res.status(500).json({
        success:false,
        message:"Something went wrong while validating"
       })
    }

}



//IsStudent

exports.IsStudent = async (req, res, next) => {
    try{
          if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Student Only",
            })
          }
          next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cant be verified"
        })
    }
}

// ISadmin

exports.IsAdmin = async (req, res , next) => {
    try{
          if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin Only",
            })
          }
          next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cant be verified"
        })
    }
}

// ISInstructor

exports.IsInstructor = async (req, res, next) => {
    try{
          if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Instructor Only",
            })
          }
          next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can`t be verified"
        })
    }
}