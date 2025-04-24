import { Model,DataTypes } from "sequelize";
import sequelize from "../database/dbConfig";
import bcrypt from 'bcrypt';


class User extends Model{
    public readonly id!:string;
    public readonly FName!:string;
    public readonly LName!:string;
    private readonly password!:string;
    private readonly PhoneNumber!:string;
    private readonly isVerified!:boolean;

    public static async hashPassword(password:string){
        const saltRounds=10;
        const salt=await bcrypt.genSalt(saltRounds);
        const hashed=await bcrypt.hash(password,salt);
        return hashed;
    }

    public static async comparePassword(enteredPassword:string,storedPassword:string):Promise<boolean>{
        const hashedPassword=bcrypt.compare(enteredPassword,storedPassword);
        return hashedPassword;
    }
}

User.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    FName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    LName:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    PhoneNumber:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }

},
{
    sequelize,
    tableName:"User",
    timestamps:true,
}
);



export default User;
