const express=require("express")
const mongoose=require("mongoose")
const ticketModel=require("../models/ticketModel")
const auth=require("../Middlewares/auth")
const router=express.Router()

router.all("/",(req,res,next)=>{
   // res.json({message : "hello from ticket router"})
    next()
})

//create a new ticket
router.post("/",auth,async(req,res)=>{
    const {sender,role,subject,description}=req.body
    console.log(req.body);
    const ticketObj={
       clientId: req.userId,
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

//get all tickets
router.get("/",auth,async(req,res)=>{

    try {
        const tickets = await ticketModel.find({})
        if(tickets){
            return  res.status(200).send({tickets})
        }
        res.status(400).send({message:"something went wrong.Please try again later..."});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
})

//get all tickets created by that individual user
router.get("/myTickets",auth,async(req,res)=>{
    try {
        const tickets = await ticketModel.find({clientId:req.userId})
        if(tickets){
            return  res.status(200).send({tickets})
        }
        res.status(400).send({message:"something went wrong.Please try again later..."});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
})
//get a specific ticket
router.get("/:ticketId",auth,async(req,res)=>{
    try {
        const {ticketId}=req.params
        const ticket = await ticketModel.find({_id:ticketId})
        if(ticket){
            return  res.status(200).send({ticket})
        }
        res.status(400).send({message:"something went wrong.Please try again later..."});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports=router