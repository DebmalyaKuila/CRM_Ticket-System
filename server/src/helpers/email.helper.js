const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    //service not 
    service:process.env.TEST_EMAIL_SERVICE,
    host: process.env.TEST_EMAIL_HOST,
    port:465 ,//587
    auth: {
        user: process.env.TEST_EMAIL,
        pass: process.env.TEST_EMAIL_PASSWORD
    }
});


const send=(emailInfo)=>{

    return new Promise(async(resolve,reject)=>{
        try {
            // send mail with defined transport object
   const info = await transporter.sendMail(emailInfo);
 
   console.log("Message sent: %s", info.messageId);
   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
   resolve(info)
    } catch (error) {
     console.log(error);
    }
    })


  
}


const emailProcessor=({type,email,pin})=>{
    let emailInfo
    switch (type) {
        case "password-reset":
             emailInfo={
                from: '"CRM Tickets Company" <gunnar86@ethereal.email>', // sender address
                to: email, // receiver
                subject: "Password reset pin", // Subject line
                text: "Here's your password reset pin "+pin+".This pin will expire in 1 day", // plain text body
                html: `<p>Here's your password reset pin <b>${pin}</b>.This pin will expire in 1 day</p>`, // html body
              }
        
              
            break;
            case "password-updated":
                 emailInfo={
                    from: '"CRM Tickets Company" <gunnar86@ethereal.email>', // sender address
                    to: email, // receiver
                    subject: "Password updated", // Subject line
                    text: "Your password has been succesfully updated", // plain text body
                    html: `<p>Your password has been succesfully updated</p>`, // html body
                  }
            
            break;
    
        default:
            break;
    }

    send(emailInfo)
}

module.exports=emailProcessor