import React from "react";
import { TbMoodSad } from "react-icons/tb";


const Error = () => {
    return(
        <div className="flex flex-col  text-richblack-600 ">
                
                
                <div className="flex flex-col items-center justify-center w-full h-full mt-[200px] ">
                <p className="text-[60px] "> Error - 404</p>
           <p className="text-lg text-center text-[40px]  text-richblack-600 mt-3"> Not Found This Page At This Moment.</p>

             <span className="mt-8 text-[60px]"><TbMoodSad />
                      </span>

                </div>
        </div>
    )
}

export default Error;