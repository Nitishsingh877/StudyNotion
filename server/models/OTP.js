
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemolate");


const OtpSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
   otp: 
    {
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
  
})

//  to send emails

async function sendVerificationEmail(email,otp ) {
  try{
    console.log("email" , email);

    const mailResponse = await mailSender(
      email, 
      "verification Email", 
      otpTemplate(otp)
      );
    console.log("email sent Successfully" , mailResponse);

  }
  catch(err){
    console.log("send mail error");
    console.log(err);
    throw err;
  }
}
  

// OtpSchema.pre("save" , async function(next){
//     await sendVerificationEmail(this.email , this.otp);

//     next();
// })



OtpSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	console.log('THIS', this);
	if(this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});



module.exports = mongoose.model("OTP", OtpSchema);



