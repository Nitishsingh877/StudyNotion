import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from '../../../assets/Images/TimelineImage.png'


const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        desc:"fully commited to success company."
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        desc:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        desc:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        desc:"Code your way to a solution"
    },
]

const TimeLineSection = () => {
    return ( 
        <div className="">
            <div  className="flex flex-row gap-16 items-center">
                <div className="flex flex-col w-[45%] gap-11">
                   {
                    timeline.map((element , index ) => {
                        return (
                            <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-3xl">
                                    <img src={element.Logo} alt="logo" className="flex justify-center items-center rounded-2xl"/>
                                </div>

                                <div>
                                    <h2 className="font-semibold text-[18px] ">{element.heading}</h2>
                                    <p className="text-base ">{element.desc}</p>
                                </div>
                         
                            </div>
                        )
                    })
                   }
            

                </div>
                <div className=" relative shadow-blue-200   shadow-[10px_-5px_50px_-5px]">
               <img src={timelineImage} alt="timeline_image"  className="rounded-lg object-cover h-fit shadow-white shadow-[20px_20px_0px_0px]"/>
                  
                  <div className=" absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6 left-[50%] translate-x-[-50%]  translate-y-[-50%] ">
                    <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <h1 className="text-3xl font-bold">10</h1>
                        <p className="text-caribbeangreen-300">Years of Experince</p>
                    </div>
                    <div className="flex gap-5 items-center px-7">
                        <h1 className="text-3xl font-bold">250+</h1>
                        <p className="text-caribbeangreen-300">Types of Courses</p>
                    </div>

                  </div>
            </div>
            </div>

           

        </div>
    )
}

export default TimeLineSection;