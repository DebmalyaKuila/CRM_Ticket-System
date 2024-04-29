const jwt = require("jsonwebtoken")
const { setJWT } = require("../helpers/redis.helper.js")
const User = require("../models/userModel.js")

const storeUserRefreshJwt = (userId, refreshToken) => {
    try {
        const userData = User.findByIdAndUpdate(
            userId,
            {
                "refreshToken.token":refreshToken,
                "refreshToken.addedAt":Date.now()
            },
        {
            new:true
        })

        return userData;
    } catch (error) {
        console.log(error);
    }
}


const createAccessJWT = async (email, userId) => {
    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" })
        await setJWT(accessJWT, userId)
        return Promise.resolve(accessJWT)
    } catch (error) {
        return Promise.reject(error)
    }

}

const createRefreshJWT = async (email,userId) => {
    const refreshJWT = await jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "20d" })
    await storeUserRefreshJwt(userId,refreshJWT)
    return Promise.resolve(refreshJWT)
}

const verifyAccessJWT=(token)=>{
    try {
        return  Promise.resolve(jwt.verify(token,process.env.JWT_ACCESS_SECRET))
    } catch (error) {
        return Promise.resolve(error)
    }
}

const verifyRefreshToken=(token)=>{
    try {
        return  Promise.resolve(jwt.verify(token,process.env.JWT_REFRESH_SECRET))
    } catch (error) {
        return Promise.resolve(error)
    }
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshToken
}