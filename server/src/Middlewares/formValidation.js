const Joi = require('joi')

const email=Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const pin=Joi.number().min(100000).max(999999).required()
const password=Joi.string().alphanum().min(3).max(50).required()



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

module.exports={
    resetPasswordValidation,
    updatePasswordValidation
}