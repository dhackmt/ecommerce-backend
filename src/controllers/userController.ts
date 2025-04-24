import { Request, Response } from "express";
import UserService from "../services/userService";
import { injectable } from "inversify";
import { IUserService } from "../interface/userServiceInterface";
import { sendVerificationMail } from "../common/verificationMail";

@injectable()
class UserController
{   
    constructor(private readonly userService:IUserService){}

    createUser=async(req:Request,res:Response)=>{
        try
        {
                const result=await this.userService.createUser(req);
                res.send(result);
        }
        catch(error)
        {
                res.send(error);
        }
    }

    // sendMailToUser=async(req:Request,res:Response)=>{
    //     try{
    //             await sendVerificationMail();
    //     }
    //     catch(error)
    //     {
    //         res.send(error);
    //     }
    // }

    verfiyUser=async(req:Request,res:Response)=>{
        try{
            const result=await this.userService.verifyUser(req);
            res.send(result);
        }
        catch(error)
        {
            res.send(error);
        }        
    }

    loginUser=async(req:Request,res:Response)=>{
        try{
            const result=await this.userService.loginUser(req);
            res.send(result);
        }
        catch(error)
        {
            res.send(error);
        }
    }
}

export default UserController;