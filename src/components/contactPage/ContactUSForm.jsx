import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import countryCode from "../../data/countrycode.json"
import { toast } from "react-hot-toast"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"



const ContactUSForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    

     const submitContactForm = async (data) => {   
            const toastId = toast.loading("Loading...")
            try{
                  await apiConnector( "POST",  contactusEndpoint.CONTACT_US_API, data);
                  toast("Email Sent Successfully")
            } 
            catch (error) {
              console.log("ERROR MESSAGE - ", error.message)
            }
            toast.dismiss(toastId)
          } 

    
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                phoneNo:"",
                message:""
            },[reset, isSubmitSuccessful])
        }
    })


    return (
    <div>

        <form className = "flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
            <div  className="flex flex-col gap-5 lg:flex-row">


                {/* fname */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="label-style" >First Name <sup className=" text-pink-500">*</sup></label>
                    <input type="text" 
                    placeholder="Enter First Name" 
                    name="firstname"
                     id="firstname"
                     className="form-style"
                     {...register("firstname",{required:true})}
                       />
                       {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please enter your First name</span>
                        )
                       }
                </div>



                {/* lname */}

                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style" >Last Name</label>
                    <input type="text" 
                    placeholder="Enter Last Name " 
                    name="lastname"
                    className="form-style"
                     id="lastname"
                     {...register("lastname")}
                       />
                </div>
                </div>

                {/* email */}

                <div className=" flex flex-col gap-2">
                    <label htmlFor="email" className="label-style">Email Address <sup className="text-pink-500">*</sup></label>
                    <input type="email"
                    placeholder="Enter your Email"
                    name="email"
                    id="email" 
                    className="form-style"
                    {
                        ...register("email", {required:true})
                    }/>
                    {
                        errors.email && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please enter your email address</span>
                        )
                    }
                </div>



            {/* phonw number */}
                 
                 <div className="flex flex-col gap-x-2">
                    <label htmlFor="phonenumber" className="label-style">Phone Number <sup className="text-pink-500">*</sup></label>
                    <div className="flex  gap-x-5">
                        {/* dropdown */}
                        <div className="flex w-[81px] gap-2 flex-col">
                            <select
                            className="bg-richblack-600 form-style"
                            name="dropdown"
                            id="dropdown"
                            {...register("countryCode", {required:true})}>
                                {
                                       countryCode.map((element,index) => {
                                        return (
                                            <option key={index} value={element.code}>
                                                {
                                                   element.code
                                                }- {element.country}
                                            </option>
                                        )
                                       })
                                }
                            </select>


                        </div>
                          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            <input type="number"
                            placeholder="98765 4321" 
                            name="phonenumber"
                            id="phonenumber"
                            className="text-richblack-600 form-style"
                            {...register("phoneNo",{required:true ,
                             maxLength:{value:10, message:"Invalid Phone number",
                             minLength:{value:8, message:"Invalid Phone number"}}}  )}/>
                        </div>

                    </div>

                    {
                        errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{
                                errors.phoneNo.message}</span>
                        )
                    }

                 </div>



         {/* message */}

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-style">Message <sup className="text-pink-500">*</sup></label>
            <textarea
            cols={30}
            rows={7}
            placeholder="Enter your Message"
            id="message"
            name="message"
            className="form-style" 
            {
                ...register("message", {required:true})
            }/>

            {
                errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Message.</span>
                )
            }
          </div>


         
          <button type="submit"
          className = {`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          ${ !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}  disabled:bg-richblack-500 sm:text-[16px] `}>
            Send Message
           </button>
         

        </form>


    </div>
    )}





export default ContactUSForm