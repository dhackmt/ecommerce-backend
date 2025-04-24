import User from "../models/userModel";


export const createUser=async(userData:any)=>{
    try
    {
        const user=await User.create(userData);
        return user.dataValues;
    }
    catch(error:any)
    {
        throw new Error(error.message);
    }
}

export const getUserEmail=async(email:string):Promise<User | any>=>{
    try
    {
        const user=await User.findOne({where:{email:email}});
        return user;
    }   
    catch(error:any)
    {
        throw new Error(error.message);
    }
}


export const getUserPhone=async(PhoneNumber:string):Promise<User | any>=>{
    try
    {
        const user=await User.findOne({where:{PhoneNumber:PhoneNumber}});
        return user;
    }   
    catch(error:any)
    {
        throw new Error(error.message);
    }
}

