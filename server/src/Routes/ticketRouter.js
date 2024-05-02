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

//get all tickets created by that individual user(filtering)
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
//update a ticket
router.patch("/:ticketId",auth,async(req,res)=>{
    const {ticketId}=req.params
    const updates = Object.keys(req.body)
    const updateOperations = ["sender","role","subject","description"]
    const isValidOperation = updates.every((update) => {
        return updateOperations.includes(update)
    })
    //if some invalid update is being performed or some values in database which are not changable
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid update !!" })
    }
    try {
        const updateTicket =await ticketModel.findOne({_id:ticketId})
        updates.forEach((update) => {
            updateTicket[update] = req.body[update]
        })
        await updateTicket.save()
        res.send({ticket:updateTicket})
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"something went wrong.Please try again later..."})
    }
})

//close a ticket(can only be done by admin)
router.patch("/close-ticket/:ticketId",auth,async(req,res)=>{
    const {ticketId}=req.params
    try {
        const updateTicket =await ticketModel.findOne({_id:ticketId})
        updateTicket["status"] = "closed"
        await updateTicket.save()
        res.send({message:"ticket has been closed"})
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"something went wrong.Please try again later..."})
    }
})

//delete a ticket (can only be done by admin)
router.delete("/:ticketId",auth,async(req,res)=>{
    try {
        await ticketModel.findByIdAndDelete(req.params.ticketId)
        res.send({message:"ticket has been deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            reason: "internal server error",
            message: "our services are currently down"
        })
}
})

module.exports=router