const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    if(process.env.NODE_ENV === "development"){
        console.log(`Successfully connnected to mongoDB `)
    } 
  } catch (error) {
    if(process.env.NODE_ENV === "development") {  
        console.log(`ERROR: ${error}`)
    }
    process.exit(1)
  }
};

module.exports= connectDB