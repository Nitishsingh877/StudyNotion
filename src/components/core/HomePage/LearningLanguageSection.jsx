import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgess from '../../../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from "../../../assets/Images/Plan_your_lessons (1).png"
import CTAButton from '../HomePage/button';


const LearningLanguageSection = () => {
    return (
    <div  className="mt-[150px] mb-32">
        <div className="flex flex-col gap-5 items-center">
            <div className="text-4xl font-semibold text-center">
                Your Swiss Knife For <HighlightText text={"Learning Any Language"}></HighlightText>
             </div>
             <div className="text-center text-richblack-600 mx-auto text-base mt-4 font-medium">
             Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <br />progress tracking, custom schedule and more.
             </div>

             <div className="flex flex-row items-center justify-center mt-5">
                <img src={knowYourProgess} alt="knowYourProgess"  className="object-contain -mr-32"/>
                <img src={CompareWithOthers} alt="CompareWithOthers"  className="object-contain "/>
                <img src={planYourLesson} alt="planYourLesson"  className="object-contain -ml-36"/>

             </div>

             <div className="w-fit flex items-center">
                <CTAButton active={true} linkto={"/signup"}>
                    <div>Learn More</div>
                </CTAButton>
             </div>


        </div>
    </div>
    )
}

export default LearningLanguageSection;