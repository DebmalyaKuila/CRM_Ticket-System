const express = require("express")
const bcrypt=require("bcrypt")
const User = require("../models/userModel")
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper.js")
const userAuthorization = require("../Middlewares/auth.js")
const resetPinModel = require("../models/resetPinModel.js")
const emailProcessor = require("../helpers/email.helper.js")
const {resetPasswordValidation,updatePasswordValidation}=require("../Middlewares/formValidation.js")

const router = express.Router()

router.all("/", (req, res, next) => {
    next()
})

router.post('/', async (req, res) => {
    try {
        const newUser = await new User(req.body)
        await newUser.save();
        res.status(200).send({ message: "new user created", user: newUser })
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            return res.status(400).send({ message: "failed to create user", error })
        }
        res.status(400).send({ message: "failed to create user" })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "Invalid form data" })
    }

    try {
        //1.we find the user by given credentials
        const user = await User.findByCredentials(email, password)
        //findByCredentials() is a method defined by me in user model , which is a reusable function 
        const accessToken = await createAccessJWT(user.email, user._id.toString())
        const refreshToken = await createRefreshJWT(user.email, user._id.toString())

        res.send({ message: `welcome ${user.name}`, user, accessToken, refreshToken })
    } catch (error) {
        console.log(error)
        res.status(400).send()

    }
})

router.get("/", userAuthorization, async (req, res) => {

    try {
        const userId = req.userId
        const userProfile = await User.findById(userId)
        if (!userProfile) return res.status(404).send({ message: "user not found" })
        res.send({ user: userProfile })
    } catch (error) {
        console.log(error);
        res.send(500).send({ message: "internal server error ,please try again later" })
    }
})

router.post("/reset-password",resetPasswordValidation, async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email: email })

        //if a user really exists,create a reset pin and send in the given email
        if (user && user._id) {
            const data = await resetPinModel.setPasswordResetPin(user.email)
            if (data?.email && data?.pin) {
                const result = await emailProcessor({type:"password-reset",email:data.email,pin:data.pin})
            }
        }
        res.send({ message: "you will get a password reset pin in the registered email shortly..." })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" })
    }
})


router.patch("/reset-password",updatePasswordValidation, async (req, res) => {

    try {
        const { email, pin, newPassword } = req.body
        const result = await resetPinModel.findOne({ email, pin: pin.toString() })
        if (!result) {
            return res.send({ message: "Something wrong happened.Please try again later..." })
        }
        // check whether the reset pin is expired or not 
        const addDate = result.addedAt
        const expiryDate = addDate.setDate(addDate.getDate() + +process.env.PASSWORD_RESETPIN_EXPIRY_DAYS)
        const today = new Date()
        if (today > expiryDate) {
            return res.send({ message: "Invalid pin" })
        }
        //hash the new password
        const newHashedPassword=await bcrypt.hash(newPassword,8)
        //now update the password
        const user = await User.findOneAndUpdate(
            { email}
            ,
            {"password": newHashedPassword}
            ,
            {new: true})
        if (user._id) {
            //send email notification
            await emailProcessor({type:"password-updated",email})
            //when the new password is set, we also need to delete the reset pin from database
            await resetPinModel.deleteMany({email})

            return res.send({ message: "password changed succesfully!" })
        }
        res.send({ message: "unable to change password. Please try again later !" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" })
    }

})

module.exports = router