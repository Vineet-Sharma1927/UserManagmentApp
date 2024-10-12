const { verifyJWT } = require("../utils/renegrateToken");


const verifyUser = async(req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1]
    // console.log(token)

    if(!token){
        res.status(400).json({
            success:false,
            message:"token not found"
        })
    }
  
    let user = await verifyJWT(token);
    console.log(user)
    
    if(!user){
        res.status(400).json({
            success:false,
            message:"please sign in"
        })
    }
    req.user = user.id
    // console.log(req.user)
    next()
    return true
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"please sign in"
        })
    }
    
}

module.exports = verifyUser