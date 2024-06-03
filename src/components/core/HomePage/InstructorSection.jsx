import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/button"
import { FaArrowRight } from "react-icons/fa6";


const InstructorSection = () => {
    return (
        <div className="mt-16">
            <div className="flex flex-row gap-20 items-center ">
                <div className="w-[50%] ">
                    <img src={Instructor} alt="instructor_image"  className="shadow-white shadow-[-20px_-20px_0_0]"/>
                </div>
                <div className="flex flex-col w-[50%] gap-10 ">
                    <div className="text-4xl font-semibold w-[50%}">Become an  <br/> <HighlightText text={"Instructor"}/></div>
                    <div className="font-medium text-[16px] w-[80%] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                   <div className="w-fit">
                   <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row items-center gap-3 ">
                            Start teaching today!
                        <FaArrowRight/>
                        </div>
                    </CTAButton>
                   </div>
                </div>

            </div>

        </div>
    )
}

export default InstructorSection;