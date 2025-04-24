import nodemailer from "nodemailer";
import dotenv from "dotenv";
import  Jwt  from "jsonwebtoken";

dotenv.config();
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
});

const secret=process.env.JWTSECRET as string;

export const sendVerificationMail=async(userId:string,userEmail:string)=>{
    const token=Jwt.sign({id:userId},secret);
    const verificationLink=`http://localhost:3000/user/verify/${token}`
    const mailOptions={
        from:process.env.AUTH_EMAIL,
        to:userEmail,
        subject:"Email verification",
        text:`You have successfully registered to our website, Here is your verification link ${verificationLink}`
    };
    
    // return new Promise((resolve,reject)=>{
       
    // })

    transporter.sendMail(mailOptions,function(err:any,info){
        if(err)
        {
            console.log("error in sendming mail to user",err.message);
         
        }
        else{
            console.log("Mail sent",info.response);
          
        }
    })
}