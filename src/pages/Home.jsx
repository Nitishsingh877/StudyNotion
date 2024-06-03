import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/button";
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/footer";
import ExploreMore from  "../components/core/HomePage/ExploreMore"
import LogOut from "./Logout";


 
const Home = () => {
    return(
        <div>
           
          {/* section 1 */}
          <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent  items-center text-white
          justify-between">
            <Link to={"/signup"}>
                <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow shadow-pure-greys-25">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transtion-all duration-200 group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className="text-center text-4xl font-semibold mt-7">Empower your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>
         

          <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 ">
          Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future <br></br> by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </div>


          <div className="flex flex-row gap-7 mt-8 justify-center">
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
            <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>

          </div>

        <div className="shadow-blue-200 mx-3 my-12 shadow-[10px_-5px_50px_-5px] ">
        <video 
         muted
         loop
         autoPlay
         className="shadow-[20px_20px_rgba(255,255,255)]" >
            <source src={banner} type="video/mp4" ></source>
        </video>
        </div>


    {/* code sec 1 */}
    <div>
        <CodeBlocks 
        postion={"lg:flex-row"}
        heading={
            <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potential" }/> with our online courses
            </div>
        }
        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

        ctabtn1={
            {
                btnText:"Try it Yourself",
                linkto:"/signup",
                active:true,
            }
        }
        ctabtn2={
            {
                btnText:"learn More",
                linkto:"/login",
                active:false,
            }
        }
        codecolor={"text-yellow-25"}
        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css"></head>\n<body>`}
        
        backgroundGradient={<div className="codeblock1 absolute"></div>}
        />

    </div>


    {/* code sec 1 reverse */}

    <div>
        <CodeBlocks 
        postion={"lg:flex-row-reverse"}
        heading={
            <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding  in seconds " }/>
            </div>
        }
        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

        ctabtn1={
            {
                btnText:"Continue Lesson",
                linkto:"/signup",
                active:true,
            }
        }
        ctabtn2={
            {
                btnText:"learn More",
                linkto:"/login",
                active:false,
            }
        }
        codecolor={"text-yellow-25"}
        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css"></head>\n<body>`}
        backgroundGradient={<div className="codeblock2 absolute"></div>}
        />

    </div>


    <ExploreMore/>
    
    </div>

    {/* sectoion 2 part white */}
    <div className="h-[50px]"></div>

    <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage h-[310px] ">
        
         <div className="w-11/12 max-w-maxContent flex  flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white ">
            <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-3 items-center"> 
                    Explore Full Catalog
                <FaArrowRight/> </div>
            </CTAButton >
            <CTAButton active={false} linkto={"/login"}>
                <div className="flex gap-4 items-center"> 
                   Learn More
                 </div>
            </CTAButton >

            </div>

         </div>


        </div>



        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-[40px]">
            <div className="flex flex-row gap-[40px] mb-10  mt-[90px]">
                <div className="text-4xl font-semibold w-[45%] ">
                    Get the Skills you need for a <HighlightText text={"Job that is in Demand"}></HighlightText>
                </div>


                
            <div className="flex flex-col gap-10 w-[40%] items-start">
                <div className="text-[16px]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>Learn More</div>
                </CTAButton>

            </div>
            </div>


            <TimeLineSection/>
            <LearningLanguageSection/>
        </div>

    </div>


    {/* section 3 */}

    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col  items-center justify-between gap-8 first-letter: bg-richblack-900  text-white ">

        <InstructorSection/>

        <h2 className="text-4xl font-semibold mt-10 text-center ">Review from other learner</h2>


        <div className="h-[250px] w-[250px]"></div>

        

    </div>




{/* ffooter section */}

               <Footer/>
        </div>
    )
}

export default Home;