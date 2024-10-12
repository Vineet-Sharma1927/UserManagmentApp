const express = require("express")
const { CreateUser, getUser, getSpecificUser, UpdateUser, DeleteUser, login } = require("../controllers/UserControllers")
const verifyUser = require("../middlewares/auth")
const upload = require('../middlewares/upload');


const route = express.Router()


//  user Routes 
route.post("/user",upload.single('img'),CreateUser)
route.post("/login",login)

route.get("/user",getUser)

route.get("/user/:id",getSpecificUser)

route.patch("/user/:id",UpdateUser)

route.delete("/user/:id",DeleteUser)

module.exports = route

