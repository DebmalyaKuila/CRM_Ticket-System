const Joi = require('joi')

const email=Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const pin=Joi.number().min(100000).max(999999).required()
const password=Joi.string().min(3).max(50).required()


const shortStr=Joi.string().max(60)
const longStr=Joi.string().max(500).allow('')



const resetPasswordValidation= (req,res,next)=>{
    const schema=Joi.object({email})
    const value=schema.validate(req.body)
    if(value.error){
        return res.send({error:value.error.message})
    }
    next()
}

const updatePasswordValidation= (req,res,next)=>{
    const schema=Joi.object({email ,pin ,newPassword:password})
    const value=schema.validate(req.body)
    if(value.error){
        return res.send({error:value.error.message})
    }
    next()
}

const createNewTicketValidation= (req,res,next)=>{
    const schema=Joi.object({
        sender:shortStr.min(2).required(),
        role:shortStr.min(2).required(),
        subject:shortStr.min(2).required(),
        description:longStr
    })
    const value=schema.validate(req.body)
    if(value.error){
        return res.send({error:value.error.message})
    }
    next()
}

const updateTicketValidation= (req,res,next)=>{
    const schema=Joi.object({
        role:shortStr.min(2).required(),
        subject:shortStr.min(2).required(),
        description:longStr
    })
    const value=schema.validate(req.body)
    if(value.error){
        return res.send({error:value.error.message})
    }
    next()
}

module.exports={
    resetPasswordValidation,
    updatePasswordValidation,
    createNewTicketValidation,
    updateTicketValidation
}