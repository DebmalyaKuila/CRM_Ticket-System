const redis=require("redis")

const redisClient=redis.createClient({
    legacyMode: true,
    url:process.env.REDIS_URL
})
redisClient.connect()


const setJWT=async (accesstoken,userId)=>{
return new Promise((resolve,reject)=>{
    try {
        redisClient.set(accesstoken, userId ,(err,response)=>{
            if(err)reject(err)
            else resolve(response)
        })
        
    } catch (error) {
        reject(error)
    }
})
}

const getJWT= (accesstoken)=>{
   
    return new Promise((resolve,reject)=>{
        try {
            redisClient.get(accesstoken,(error,response)=>{
                if(error)reject(error)
                else resolve(response)
            })
            
        } catch (error) {
            reject(error)
        }
    })
    }

    const deleteJWT=(accessToken)=>{
        try {
            redisClient.del(accessToken)
        } catch (error) {
            console.log(error)
        }
    }

    module.exports={
        setJWT,
        getJWT,
        deleteJWT
    }
