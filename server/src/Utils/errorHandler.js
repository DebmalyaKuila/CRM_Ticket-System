//a function to handle all the error ->centralizing the error message as this can create issue when my application gets bigger and bigger

const handleError=(error,res)=>{
    console.log(error);
    //if theres error.status ,then it will be the response status , otherwise it's a system error( status-500)
    res.status(error.status || 500).send({
        message: error.message
    })
}

module.exports=handleError