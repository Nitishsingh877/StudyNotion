import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import {  useLocation, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";



const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {password, confirmPassword} = formData;


    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
      e.preventDefault()
      const token = location.pathname.split("/").at(-1)
      dispatch(resetPassword(password, confirmPassword, token, navigate));
    }
    return(
        <div  className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose New Password</h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label htmlFor=""><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Enter New Password <sub className="text-pink-200">*</sub></p>
                            <input type={showPassword ? "text" : "password"}
                             required 
                             placeholder="********" 
                             value={password} 
                             name="password" 
                             className="form-style w-full !pr-10 py-3 border border-richblack-100 rounded-md text-white bg-richblack-600"
                            onChange={handleOnChange}/>


                            <span  className="absolute top-[335px] right-[555px]  z-[10] cursor-pointer" onClick={() => {
                                setShowPassword((prev) => !prev)
                            }}>
                                {
                                    showPassword ? <IoMdEyeOff fontSize={24} fill="#AFB2BF" /> : <IoEye fontSize={24} fill="#AFB2BF"/>
                                }

                            </span>
                            </label>




                            <label htmlFor=""  className="relative mt-3 block">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sub  className="text-pink-200">*</sub></p>
                            <input type={showConfirmPassword ? "text" : "password"} 
                            required 
                            placeholder="********" 
                            value={confirmPassword} 
                            name="confirmPassword"
                            className="form-style w-full !pr-10 py-3 border border-richblack-100 rounded-md text-white bg-richblack-600"

                            onChange={handleOnChange}/>
                            <span
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            onClick={() => {
                                setShowConfirmPassword((prev) => !prev)
                            }}>
                                {
                                    showConfirmPassword ? <IoMdEyeOff fontSize={24} fill="#AFB2BF" /> : <IoEye fontSize={24} fill="#AFB2BF" />
                                }

                            </span>
                            </label>



                            <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                             type="submit">
                                Reset Password
                            </button>
                        </form>


               <div className="mt-6 flex items-center justify-between">
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

export default UpdatePassword;