import React from "react";
import CTAButton from "../HomePage/button"
import { FaArrowRight } from "react-icons/fa6";
import {TypeAnimation} from "react-type-animation";

const CodeBlocks = ({
    postion, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codecolor  
}) => {
    return (
    <div className={`flex ${postion} my-20 justify-between gap-10 `}>
        
    {/* left */}
    <div className="w-[50%] flex flex-col gap-8">
       {heading}
     <div className="text-richblack-300 font-bold ">{subheading}</div>




     <div className="flex flex-row gap-7 mt-7 ">
      
        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
            {ctabtn1.btnText} <FaArrowRight /> 
            </div>
        </CTAButton>
    

     <div className="flex gap-2 items-center">
        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
          
            {ctabtn2.btnText}
        </CTAButton>
        </div>
        </div>
    


    


    </div>



{/* sect right */}
   <div className="h-fit flex flex-row text-[15px] w-[100%] py-3 lg:w-[500px] relative border border-richblack-300">
    {/* bg gradient hw */}
    {backgroundGradient}
  <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold ">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
    <p>7</p>
    <p>8</p>
    <p>9</p>
    <p>10</p>
    <p>11</p>
  </div>

  <div className={`w-[90%] flex flex-col font-mono  font-lg ${codecolor} pr-2`}>
   <TypeAnimation
   sequence= {[codeblock , 2000 , ""]}
   repeat={Infinity}
   cursor={true}
  style={
    {
     display:"block",
     whiteSpace:"pre-line"
    }
  }
  omitDeletionAnimation={true}
  

   />
  </div>

    
   </div>

  


    </div>




    )
}

export default CodeBlocks;