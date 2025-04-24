class RegistrationDTO{
    FName!:string;
    LName!:string;
    email!:string;
    PhoneNumber!:string;
    message!:string;
    constructor(props:any)
    {
        this.message= `Registration Successfull! Please verify yourself by clicking on the verification link sent via email . Did'nt Recieve ? Resend http://localhost:3000/user/sendMail/${props.id}`;
        this.FName=props.FName || "";
        this.LName=props.LName || "";
        this.email=props.email || "";
        this.PhoneNumber=props.PhoneNumber || "";
    }
}

export default RegistrationDTO;