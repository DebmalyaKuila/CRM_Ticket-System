const {Schema,model}=require("mongoose")
const randomPinGenerator=require("../Utils/randomPinGenerator")

const resetPinSchema=new Schema({

    pin:{
        type:String,
        maxlength:6,
        minlength:6,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    addedAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

resetPinSchema.statics.setPasswordResetPin = async (email)=>{
try {
    const pinLength=6
    const randPin=randomPinGenerator(pinLength);
    const resObject={
        email,
        pin:randPin
    }
    const newResetPin = await new resetPinModel(resObject)
    await newResetPin.save();
    return resObject
    
} catch (error) {
    console.log(error)
    return null;
}
}

const resetPinModel=model("resetPin",resetPinSchema)

module.exports=resetPinModel
