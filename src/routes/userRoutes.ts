import { Router,Request,Response } from "express";
import UserController from "../controllers/userController";

class UserRoutes
{
    public userController:UserController;
    private router:Router;
    constructor(userController:UserController)
    {
        this.userController=userController;
        this.router=Router();
        this.configureRoutes();
    }

    configureRoutes()
    {
        this.router.post("/register",(req:Request,res:Response)=>this.userController.createUser(req,res));
        this.router.post("/login",(req:Request,res:Response)=>this.userController.loginUser(req,res));
        this.router.get("/verify/:token",(req:Request,res:Response)=>this.userController.verfiyUser(req,res));

    }

    getRouter():Router
    {
        return this.router;
    }
    
}

export default UserRoutes;