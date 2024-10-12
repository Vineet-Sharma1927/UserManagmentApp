const mongoose = require("mongoose")
require('dotenv').config();

async function DbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("database connected")
    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = DbConnect