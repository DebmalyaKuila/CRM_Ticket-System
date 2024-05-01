const express=require("express")
const mongoose=require("mongoose")
const ticketModel=require("../models/ticketModel")
const router=express.Router()

router.all("/",(req,res,next)=>{
   // res.json({message : "hello from ticket router"})
    next()
})

router.post("/",async(req,res)=>{
    const {sender,role,subject,description}=req.body

    const ticketObj={
       clientId: new mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
        sender,
        role,
        subject,
        description
    }
    
    try {
        const newTicket = await new ticketModel(ticketObj)
        await newTicket.save();
        if(newTicket._id){
            return  res.status(201).send({ message:"new ticket created",newTicket})
        }
        res.status(400).send({message:"something went wrong.Please try again later..."});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports=router