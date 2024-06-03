const Category  = require("../models/Category")
const { Mongoose } = require("mongoose");


exports.createCategory = async (req, res) => {
    try{
  const {name , description} = req.body;
  
  if(!name || !description ) {
         return res.status(400).json({
            success:false,
            message:"all fields are required",
         });
  }

  const CategoryDetails = await Category.create({
    name:name,
    description:description,
  });
  console.log(CategoryDetails);

  return res.status(200).json({
    success:true,
    message:"Category created succesfully"
  })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}


// get all category
exports.showAllCategories = async (req, res) => {
	try {
        
		const allCategorys = await Category.find({});          // it find all Category from DB;

    return res.status(200).json({ success: true , data: allCategorys, });	 
	}
   catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.categoryPageDetails = async (req, res) => {
    try{
    //  get categoryid
    const {categoryId} = req.body;
    // getcoursesforspecifiedid
    const selectedCategory = await Category.findById(categoryId)
                                     .populate("courses")
                                     .exec();
    // validation
    if(!selectedCategory) {
        return res.status(404).json({
            success:false,
            message:"no data for selected category"
        })
    }
    // get courses for diff category
    const diffrentCategoty = await Category.find({
        _id:{$ne:categoryId},
    }).populate("courses")
    .exec();
    // top selling courses

    // hw

    return res.status(200).json({
        success:true,
        message:"data fetched for selected category",
        data:{
            selectedCategory,
            diffrentCategoty,
            // topselling
        }
    })



    }catch(err) {
        return res.status(400).json({
            success:false,
            message:"data not fecthed selected category"
        })

    }
}