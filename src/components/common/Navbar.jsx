import  {NavbarLinks} from "../../data/navbar-links";
import React, { useEffect, useState } from "react";
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link , useLocation} from "react-router-dom";
import { matchPath } from "react-router";
import {useSelector} from "react-redux";
import { FaCartPlus } from "react-icons/fa6";
import ProfileDropdown from "../Auth/ProfileDropdown"
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaCaretDown } from "react-icons/fa";
import {fetchCourseCategories} from '../../services/operations/courseDetailsAPI';



const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

 const location = useLocation();
 // subllininl wali line
 const [subLinks, setSubLinks] = useState([])
 const [loading, setLoading] = useState(false)





  
 


    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", fetchCourseCategories)
            setSubLinks(res.data.data)
          } catch(error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])


    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }
    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ">
            <div className="flex w-11/12 items-center max-w-maxContent justify-between">
               
               
                <Link to="/">
                <img src={logo} alt="Logo" height={32} width={160} loading="lazy" />
                </Link>


                {/* nav links */}

              



            <nav className="hidden md:block">                                                                    {/* Navigation links */}
          <ul className="flex gap-x-6 text-richblack-25">

              { NavbarLinks.map((link, index) => (

                  <li key = {index}>
                      { link.title === "Catalog" ? (

                                 <>
                                    <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25" }`} >
                                        <p> {link.title} </p>  <FaCaretDown />                                   {/*   "Catalog \/"   */}     
                                        
                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                {loading ? (<p className="text-center"> Loading... </p> ) : subLinks?.length ? ( 

                                  <> 
             { subLinks?.filter( (subLink) => subLink.courses.length > 0)?.map((subLink, i) => (
                                                                                                                                            <Link to={`/catalog/
                                                                                                                                            ${subLink.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"  key={i} >
                                                                                                                                                <p>{subLink.name}</p>
                                                                                                                                            </Link>
                                                                                                                                      ))
                                                                              }
                                                                          </>
                                                              ):( <p className="text-center">No Courses Found</p> )
                                              }                                     
                                        </div>
                                    </div>
                                 </>

                            ) : (
                              <Link to = {link?.path}>
                                <p className = {` ${matchRoute(link?.path)? "text-yellow-25" : "text-richblack-25"} `}> {link.title}  </p>
                              </Link>
                              )
                      }
                  </li>

                  ))
              }

          </ul>
        </nav>




                {/* login signup dashboard */}
                 <div className="flex gap-x-4 items-center">


                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="releative">
                             <FaCartPlus />
                             {
                                totalItems > 0 && 
                                <span>
                                    {totalItems}
                                </span>
                             }
                            </Link>
                        )
                    }


                    {
                        token === null && (
                            <Link to="/login">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md" >
                                Log in
                            </button>
                            </Link>
                        )
                    }

                    {
                        token === null &&  (
                            <Link to="/signup">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Sign Up
                            </button>
                            </Link>
                        )
                    }

                    {
                        token != null && <ProfileDropdown/>
                    }

                
                 </div>


            </div>
          
        </div>
    )
}

export default Navbar;