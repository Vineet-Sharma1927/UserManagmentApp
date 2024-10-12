const User = require("../models/UserSchema")
const bcrypt = require("bcrypt")
const {generateJWT} = require("../utils/renegrateToken")



async function CreateUser(req,res){
    let {name,email,password,mobile,designation,gender,course} = req.body
    console.log(req.body)
    try {
        
        if (!name) {
            return res.status(500).json({success:false,message:"Please fill the name"})
        }
        if (!email) {
            return res.status(500).json({success:false,message:"Please fill the email"})
        }
        if (!password) {
            return res.status(500).json({success:false,message:"Please fill the password"})
        }
        if (!mobile) {
            return res.status(500).json({success:false,message:"Please fill the mobile no."})
        }
        if (!designation) {
            return res.status(500).json({success:false,message:"Please fill the designation"})
        }
        if (!gender) {
            return res.status(500).json({success:false,message:"Please fill the gender"})
        }
        if (!course) {
            return res.status(500).json({success:false,message:"Please fill the course"})
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload an image" });
        }

        console.log("Uploaded image path:", req.file.path);

        const CheckFOrExistanceUser = await User.findOne({email})
        if(CheckFOrExistanceUser){
            return res.status(400).json({success:false,message:"User With This email already register"})
        }

        const hashpass = await bcrypt.hash(password,10)

        const NewUser = await User.create({
            name,
            email,
            password:hashpass,
            mobile,
            designation,
            gender,
            course:Array.isArray(course) ? course[0] : course,
            img:req.file.path ,
        })
        console.log(NewUser)

        const token = await generateJWT({
            email:NewUser.email,
            id:NewUser._id
        })
        // console.log(token);

        
        return res.status(200).json({success:true,message:"User created sucessfully ",user:{
            name:NewUser.name,
            email:NewUser.email,
            mobile:NewUser.mobile,
            designation:NewUser.designation,
            gender:NewUser.gender,
            course:NewUser.course,
            img:`http://localhost:3000/${NewUser.img}`,
            token,
        }})
        
        
    } catch (error) {
        return res.status(500).json({success:false,message:"error occured ",error:error.message})
    }
}

async function login(req,res){
    try {
        let {email,password} = req.body
        if (!email) {
            return res.status(500).json({success:false,message:"Please fill the email"})
        }
        if (!password) {
            return res.status(500).json({success:false,message:"Please fill the password"})
        }

        const CheckFOrExistanceUser = await User.findOne({email})
        if(!CheckFOrExistanceUser){
            return res.status(400).json({success:false,message:"User not Exist"})
        }

        const CheckforPass = await bcrypt.compare(password,CheckFOrExistanceUser.password)
        // console.log(CheckforPass)
        if(!CheckforPass){
            return res.status(500).json({success:false,message:"Incorrect Password"})
        }

        const token = await generateJWT({
            email:CheckFOrExistanceUser.email,
            id:CheckFOrExistanceUser._id
        })

        return res.status(200).json({success:true,message:"User logged in ",CheckFOrExistanceUser,token})
    } catch (error) {
        return res.status(500).json({success:false,message:"error occured ",error:error.message})
    }
}



async function getUser(req,res){

    const users = await User.find({})
    try {
        return res.status(200).json({success:true,message:"User fetched sucessfully ",users})
    } catch (error) {
        return res.status(500).json({success:true,message:"error occured "})
    }
}


async function getSpecificUser(req,res){
    try {
        const id = req.params.id
    let user = await User.findById(id)
    if (!user) {
        return res.status(200).json({success:false,message:"User not found",})
    }
    return res.status(200).json({success:true,message:"User Fetched successfully",user,})
    } catch (error) {
        return res.status(500).json({success:false,message:"User not found",error:error.message})
    }

}

async function UpdateUser(req,res){
    try {
        const {id} = req.params
    const {name,email,password,mobile,designation,gender,course} = req.body
    const updatedUser = await User.findByIdAndUpdate(id, {name,email,password,mobile,designation,gender,course,},{new:true})

    if (!updatedUser) {
        return res.status(200).json({
            success:false,
            message:"User not found",
        })
    }
        
    return res.status(200).json({success:true,message:"user updated successfully",updatedUser})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user Cannot be updated ",
            error:error.message
        })
    }
    
}

async function DeleteUser(req,res){
    try {
        const {id} = req.params
        const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
        return res.status(200).json({
            success:false,
            message:"User not found",
        })
    }
        
    return res.status(200).json({success:true,message:"user deleted successfully",deletedUser})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user Cannot be deleted ",
            error:error.message
        })
    }
    
}

module.exports = {CreateUser,getUser,getSpecificUser,UpdateUser,DeleteUser,login}
