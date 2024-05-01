const {verifyAccessJWT}=require("../helpers/jwt.helper")
const {getJWT,deleteJWT}=require("../helpers/redis.helper")

const userAuthorization = async (req, res , next)=>{
         const token = req.header('Authorization')?.replace('Bearer ','')

        const decoded= await verifyAccessJWT(token,process.env.JWT_ACCESS_SECRET)
        //if the token is  verified and it has a email 
        if(decoded.email)
        {
            const userId = await getJWT(token)
            //if there's no userId stored in redis associated to that token
            if(!userId){
                return  res.status(403).send({message:"Forbidden action..."})
            }
            req.userId=userId
            return next()
        }
        
        //delete old access token from redis to avoid data crowding(if token is invalid or expired, delete from redis database)
        //but what if there's no token provided in request header, token will be undefined.That's why an if statement is added
        if(token)deleteJWT(token) 
        //when token is expired or isn't verified
        return  res.status(403).send({message:"Forbidden action"})

        
}

module.exports=userAuthorization