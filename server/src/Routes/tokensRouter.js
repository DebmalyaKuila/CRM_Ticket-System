const express=require("express")
const router=express.Router()

const {verifyRefreshToken,createAccessJWT}=require("../helpers/jwt.helper")
const User = require("../models/userModel")

router.get("/",async(req,res)=>{
        const refreshToken = req.header('Authorization').replace('Bearer ','')
        const decoded=await verifyRefreshToken(refreshToken)
        //if decoded has an email i.e. token is verified
        if(decoded.email){
                const userProfile= await User.findOne({email:decoded.email})
                //if we find a user profile
                if(userProfile._id){
                        //check if token is expired or not
                        const tokenCreated=userProfile.refreshToken.addedAt
                        const dbRefreshToken=userProfile.refreshToken.token
                        const tokenExpireDate= tokenCreated.setDate( tokenCreated.getDate()+ +process.env.JWT_REFRESH_EXPIRY_DAYS)
                        const today=new Date()
                        //token is not expired
                        if(today<tokenExpireDate && refreshToken==dbRefreshToken){
                                const newAccessJWT= await createAccessJWT(decoded.email,userProfile._id.toString())   
                                return res.send({newAccessToken:newAccessJWT,userProfile})
                        }
                }
             
        }
        res.status(403).send({message:"Forbidden action"})
})

module.exports=router