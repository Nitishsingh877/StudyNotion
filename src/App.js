import './App.css';
import { useEffect } from "react"

import {  useDispatch, useSelector } from "react-redux"   
import { Route , Routes, useNavigate } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Login from"./pages/Login"
import Signup from "./pages/Signup";
import ForgotPassword from './pages/forgotPassword';
import UpdatePassword from './pages/updatePassword';
import VerifyEmail from './pages/verifyEmail';
import Error from "./pages/Error";

import About from './pages/about';
import Contact from './pages/Contact';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashborad'
import Settings from './components/core/Dashboard/Settings';
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart"
import { getUserDetails } from "./services/operations/ProfileAPI"
import { ACCOUNT_TYPE } from "./utils/constants"
import AddCourse from './components/core/Dashboard/AddCourse';



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile)



  useEffect(() => {                                                    // it store data of user in localstroage and when we open browser then that user logined;                 
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
  }, [])
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>


      <Routes>
        <Route path='/' element={<Home />}></Route>
    

    
     <Route
          path="login"
          element={
            
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
          />
   

       
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />   
       

       
            <Route path='forgot-password'
            element= {
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }>

            </Route>
          

        
          <Route path='update-password/:id'
            element= {
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            }>

            </Route>
         

          
         
          <Route path='verify-email'
            element= {
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            }>
            </Route>
          
          
          <Route path='about'
            element= {
              
                <About/>
              
            }>
            </Route>
          
         
          <Route path='contact'
            element= {
                <Contact/>
            }>
            </Route>
         
          <Route element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>

        <Route path='dashboard/my-profile'  element={<MyProfile/> }/> 

        <Route path="dashboard/Settings"  element={<Settings />} /> 


        
        { user?.accountType === ACCOUNT_TYPE.STUDENT && (          
                                    <>
                                        <Route path="dashboard/cart" element={<Cart />} />
                                        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                                    </>
                                )           
                  }
        { user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (          
                                    <>
                                        <Route path="dashboard/add-course" element={<AddCourse />} />
                                        
                                    </>
                                )           
                  }


          </Route>
           
         
          


<Route path="*" element={<Error />} />

          </Routes>
    </div>
  )
}

export default App;
