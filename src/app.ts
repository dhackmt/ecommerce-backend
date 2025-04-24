import express from "express";
import { Container } from "inversify";
import { IUserService } from "./interface/userServiceInterface";
import UserService from "./services/userService";
import UserController from "./controllers/userController";
import UserRoutes from "./routes/userRoutes";
import sequelize from "./database/dbConfig";
import bodyParser from "body-parser";


const app=express();

const container=new Container();


app.use(express.json());



container.bind<IUserService>("IUserService").to(UserService);
const userService=container.get<IUserService>("IUserService");
const userController=new UserController(userService);
const UserRouterInstance=new UserRoutes(userController);

app.use("/user",UserRouterInstance.getRouter());

sequelize.authenticate().then(()=>{
    console.log("Database Authenticated")
}).catch((error)=>{console.log(`error in Authentication ${error}`)});


sequelize.sync().then(()=>{console.log("Database Synced!")}).catch((error)=>{
    console.log(`Error in Database Sync ${error}`);
})


app.listen(3000,()=>{
    console.log("API Running!");
});