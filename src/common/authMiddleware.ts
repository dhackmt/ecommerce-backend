import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./auth";

export const authMiddleware=(role:string[])=>(req:Request,res:Response,next:NextFunction)=>{
try{
    const userData=req.headers["authorization"];
    if(!userData)
    {
        res.json({message:"No token Found!"});
        return;
    }
    const token=userData?.split(" ")[1];
    const user=verifyToken(token);
    if(!user)
    {
        res.json({message:"Token Data not Found"});
    }
    if(!role.includes(user.role))
    {
        res.json({message:"You are not authorized for this page"});
        return;
    }
    (req as any).user={id:user.id,role:user.role};
    next();
}
catch(error)
{

}
}