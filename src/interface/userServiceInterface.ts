import { Request } from "express";

export interface IUserService{
    createUser(reqObject:Request):Promise<any>;
    loginUser(reqObject:Request):Promise<any>;
    verifyUser(reqObject:Request):Promise<any>;
}