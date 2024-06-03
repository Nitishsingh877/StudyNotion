import React, { useState } from "react"
import {useDispatch, useSelector} from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import  {getPasswordResetToken} from '../services/operations/authAPI';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const[emailSent , setEmailSent] = useState(false);
     // eslint-disable-next-line
    const[email , setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    const handleOnSubmit = (e) => {
     e.preventDefault();
     dispatch(getPasswordResetToken(email,setEmailSent));
    }
    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
           loading ? (
            <div>Loading ... </div>
           ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{
                !emailSent ? "Reset Your Password " : "Check Your Email"
                }
            </h1>

            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                {
                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                }
            </p>
            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent && (
                        <label htmlFor=""  className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                            <input type="email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email Address"
                            className="form-style w-full py-3 bg-richblack-700 rounded-md border border-richblack-100 text-white leading-3" />
                            
                        </label>
                    )
                }

                <button type="submit"
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
            </form>

            <div  className="mt-6 flex items-center justify-between">
               <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5"> <IoMdArrowBack />
                 Back to login</p>
               </Link>
            </div>
            </div>
           )
            }
        </div>
    )
}

export default ForgotPassword;