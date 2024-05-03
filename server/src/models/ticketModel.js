const {Schema,model}=require("mongoose")

const ticketSchema=new Schema({
    clientId:{
        type:Schema.Types.ObjectId
    },
    sender:{
        type:String,
        maxlength:100,
        minlength:3,
        required:true
    },
    role:{
        type:String,
        maxlength:100,
        minlength:3,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        maxlength:30,
        default:"pending"
    },
    openAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

ticketSchema.methods.toJSON = function(){
    //get the mongoose document using this keyword
    const ticket = this
    //convert the mongoose document to an object by using toObject() method of mongoose
    const ticketObject=ticket.toObject()
    //delete password , tokens, version from user object to hide private data of user
    delete ticketObject._id
    delete ticketObject.__v
    delete ticketObject.clientId

    return ticketObject
}

const ticketModel=model("ticket",ticketSchema)

module.exports=ticketModel
