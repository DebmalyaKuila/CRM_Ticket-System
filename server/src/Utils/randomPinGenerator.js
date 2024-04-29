//instead of using math.random() for pin generation, use crypto.randomInt() as it's cryptographically seacure

const crypto=require("crypto")
const randomPinGenerator=(length)=>{
let mini,maxi;
    if(length==1){
        mini=0;
        maxi=9;
    }else{
        mini=Math.pow(10,length-1)
        maxi=parseInt('9'.repeat(length))
    }

const pinCode=crypto.randomInt(mini,maxi).toString()
return pinCode
}

module.exports=randomPinGenerator