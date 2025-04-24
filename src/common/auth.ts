import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
let secret=process.env.JWTSECRET as string;
interface Payload{
    id:string;
    email:string;
    role:string;
}
export const createToken=(email:string,id:string,role:string)=>{

    try{
        const payload:Payload={
            id:id,
            email:email,
            role:role
        }
        
        const token=JWT.sign(payload,secret);
        return token;
    }
    catch(error)
    {
        return error;
    }
}

export const verifyToken=(token:string)=>{
    try{
       const user:Payload=JWT.verify(token,secret) as Payload;
       return user;
    }   
    catch(error:any)
    {
        throw new Error(error.message);
    }
}