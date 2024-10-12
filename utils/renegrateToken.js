const jwt = require("jsonwebtoken")

async function generateJWT(payload){
    let token =await jwt.sign(payload,"jwtkapasseordbohotstronghaibhaiya")
    return token;
}
async function verifyJWT(token){
    try {
        let user =await jwt.verify(token,"jwtkapasseordbohotstronghaibhaiya")
    return user;
    } catch (error) {
        return false 
    } 
}
async function decodeJWT(token){
    try {
        let decoded = await jwt.decode(token)
        return decoded
    } catch (error) {
        
    }
}

module.exports = {generateJWT,verifyJWT,decodeJWT}