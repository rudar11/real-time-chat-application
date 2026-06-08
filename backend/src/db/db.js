const mongoose = require('mongoose');

const connectdb = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Database connected successfully");
   } catch (error) {
      console.error(" Database connection failed:", error.message);
      process.exit(1); // Agar DB connect nahi hua toh server exit kar do
   }
}

module.exports = connectdb;