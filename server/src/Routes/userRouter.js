const express=require("express")
const User=require("../models/userModel")
const {createAccessJWT,createRefreshJWT}=require("../helpers/jwt.helper.js")
const userAuthorization=require("../Middlewares/auth.js")
const resetPinModel=require("../models/resetPinModel.js")
const emailProcessor=require("../helpers/email.helper.js")
const router=express.Router()

router.all("/",(req,res,next)=>{
    next()
})

router.post('/',async(req,res)=>{
    try {
        const newUser=await new User(req.body)
        await newUser.save();
        res.status(200).send({ message:"new user created",user: newUser})
    } catch (error) {
        if(process.env.NODE_ENV === "development"){
           return res.status(400).send({message:"failed to create user",error})
        }
        res.status(400).send({message:"failed to create user"})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password) {
        return res.status(400).send({message:"Invalid form data"})
    } 
    
    try {
        //1.we find the user by given credentials
        const user = await  User.findByCredentials(email, password)
        //findByCredentials() is a method defined by me in user model , which is a reusable function 
        const accessToken=await createAccessJWT(user.email,user._id.toString())
        const refreshToken =await createRefreshJWT(user.email,user._id.toString())
        
        res.send({ message:`welcome ${user.name}`, user, accessToken,refreshToken })
    } catch (error) {
        console.log(error)
        res.status(400).send()

    }
})

router.get("/",userAuthorization,async(req,res)=>{

   try {
    const userId=req.userId
    const userProfile=await User.findById(userId)
    if(!userProfile) return res.status(404).send({message:"user not found"})
    res.send({userId:userProfile})
   } catch (error) {
    console.log(error);
    res.send(500).send({message:"internal server error ,please try again later"})
   }
})

router.post("/reset-password",async(req,res)=>{
    const {email}=req.body

    const user=await User.findOne({email:email})

    //if a user really exists,create a reset pin and s4end in the given email
    if(user && user._id){
        const data=await resetPinModel.setPasswordResetPin(user.email)
        console.log("ggggggggggggggg",data);
        if(data?.email && data?.pin){
            console.log("yipeee....................");
            const result=await emailProcessor(data.email,data.pin)
            console.log(result);
            if(result?.messageId){
                console.log(result);
            return   res.send({message:"Unable to send email.Please try again later...yessssssssss"})
            }
        }
    }

    res.send({message:"you will get a password reset pin in the registered email shortly..."})
})

module.exports=router