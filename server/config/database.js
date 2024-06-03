const mongoose = require("mongoose");
require("dotenv").config();



exports.connect = () => { 
    mongoose.connect(process.env.MONGODB_URL , {
        // type: mongoose.Schema.Types.Object.Id, 
        // useNewUrlParser: true,
        // useUnifiedTopology : true,
    })
    .then(() => console.log("db connected succesfully"))
    .catch((err) => {
        console.log("db connection failed");
        console.log(err);
        process.exit(1);
    })
};