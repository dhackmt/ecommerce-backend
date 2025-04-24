import { injectable } from "inversify";
import { IUserService } from "../interface/userServiceInterface";
import { Request, Response } from "express";
import User from "../models/userModel";
import {v4 as uuidv4} from "uuid";
import {createUser,getUserEmail,getUserPhone} from "../database/databaseServices"
import { createToken, verifyToken } from "../common/auth";
import { sendVerificationMail } from "../common/verificationMail";
import RegistrationDTO from "../DTO/registerationDTO";

@injectable()
class UserService implements IUserService {

    createUser=async(reqObject: Request): Promise<any>=> {
        try
        {
            const {email,password,FName,LName,PhoneNumber}=reqObject.body;
            if(!email || !password || !FName || !LName)
            {
                return {message:"Missing Parameters!"};
            }
            const userExists=await getUserEmail(email);
            if(userExists)
            {
                return {message:"User Already Exists!"};
            }
            const checkPassword=this.checkPasswordStrength(password);
            if(!checkPassword.valid)
            {
                return {message:`Password too weak \n ${checkPassword.message}`};
            }
            if(PhoneNumber && PhoneNumber.length!==10)
            {
                return {message:"Invalid Phone Number"};
            }

            const getUserByPhone=await getUserPhone(PhoneNumber);
            if(getUserByPhone)
            {
                return {message:"Phone number already Exists!"};
            }
            const hashedPassword=await User.hashPassword(password);
            const id=uuidv4();
            const userData={
                id:id,
                FName:FName,
                LName:LName,
                email:email,
                password:hashedPassword,
                PhoneNumber:PhoneNumber
            }
            const user=await createUser(userData);
            await sendVerificationMail(id,email);
            console.log(user)
            const UserDTO=new RegistrationDTO(user);
            console.log(UserDTO)
            return UserDTO;
        } 
        catch(error:any)
        {
                return error.message;
        }   
    }

    checkPasswordStrength(password:string)
    {
        let maxLength=8;
        let minLength=4;

        let lowerMinCount=2;
        const LOWER_REGIX=/([a-z])/g;

        let upperMinCount=2;
        const UPPER_REGIX=/([A-z])/g;

        let numMinCount=1;
        const NUM_REGIX=/([\d])/g;


        let specialMinCount=1;
        const SPECIAL_REGEX=/([$&+,:;=?!@#|'<>.^*()%x-])/g;

        if(password.length >maxLength)
        {
            return {valid:false ,message:"Password cannot be more than 8 characters!"};
        }

        let lowerMatch=password.match(LOWER_REGIX) || [];
        let upperMatch=password.match(UPPER_REGIX) || [];
        let numMatch=password.match(NUM_REGIX) || [];
        let specialMatch=password.match(SPECIAL_REGEX) || [];

        if(password.length < minLength || lowerMatch.length <lowerMinCount || upperMatch.length < upperMinCount || numMatch.length < numMinCount || specialMatch.length < specialMinCount)
        {
            return {valid:false , message:"Password Must be atleast 6 characters , it should have atleast 2 uppercase letter, 2 lowercasde letters , 1 special character and 1 digit"}
        }

        return {valid:true};
    }

    verifyUser=async(reqObject: Request): Promise<any>=>{
        try{
                if(!reqObject.params.token)
                {
                    return {message:"Something went wrong! Token not found"};
                }
                const token=reqObject.params.token;
           
                const user:any=verifyToken(token);
                if(!user)
                {
                    return {message:"Verification failed!"};
                }

                if (user.message === "Invalid Token") {
                    return { message: "Verification failed! " + user.error };
                }
        
                const updateUser=await User.update({isVerified:true},{where:{id:user.id}});
                console.log(updateUser)
                return {message:`verification successful! `}
        }
        catch(error:any)
        {
            return error.message;
        }
    }



    loginUser=async(reqObject: Request): Promise<any>=> {
        try{
                const {email,password}=reqObject.body;
                if(!email || !password)
                {
                    return {message:"Missing Parameters!"};
                }
                const user=await getUserEmail(email);
                if(!user)
                {
                    const url="http://localhost:3000/user/register";
                    return {message:`No such User exists! ${url}}`};
                }
                const storedPassword=user.password;
                const hashedPassword=await User.comparePassword(password,storedPassword);
                if(!hashedPassword)
                {
                    return {message:"Password Does not match"};
                }
                const token=createToken(email,user.id,"user");
                return {message:`Login Successful! ${token}`};
        }
        catch(error:any)
        {   
            return error.message;
        }
    }
}

export default UserService;