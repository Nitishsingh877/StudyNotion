// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  editCourse,
  // getInstructorCourses,
  // getFullCourseDetails,
  // deleteCourse,
  // searchCourse,
  // markLectureAsComplete,
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  // addCourseToCategory,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createratingAndReview,
  getAvgRating,
  getAllRatingAndReview,
} = require("../controllers/ratingandReview")

// //demo
// const { isDemo } = require("../middlewares/demo");

// Importing Middlewares
const { auth, IsInstructor, IsStudent, IsAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, IsInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, IsInstructor,createSection)
// Update a Section
router.post("/updateSection", auth, IsInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, IsInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, IsInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, IsInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, IsInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Edit a Course
router.post("/editCourse", auth, IsInstructor,editCourse)
// // Get all Courses of a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// //Get full course details
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// // Delete a Course
// router.delete("/deleteCourse",auth,isDemo, deleteCourse)
// // Search Courses
// router.post("/searchCourse", searchCourse);
// //mark lecture as complete
// router.post("/updateCourseProgress", auth, isStudent, markLectureAsComplete);



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, IsAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)
// router.post("/addCourseToCategory", auth, isInstructor, addCourseToCategory);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, IsStudent, createratingAndReview)
router.get("/getAverageRating", getAvgRating)
router.get("/getReviews", getAllRatingAndReview)

module.exports = router;