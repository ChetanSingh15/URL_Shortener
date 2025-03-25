import { User } from "../models/user.model.js";
import {v4 as uuidv4} from "uuid"; 
import { setUser } from "../services/auth.js";

const handleUserSignup = async (req,res) => {
    const { name , email , password } = req.body;


    const user = await User.create({
        name: name,
        email: email,
        password: password,       
    })

    // console.log(user);

    return res.redirect("/")
}

const handleUserLogin = async (req,res) => {
    const { email , password } = req.body;


    const user = await User.findOne({
        email,
        password       
    })

    // console.log(user);

    if(!user){
        return res.render("login",{
            error: "Invalid email or password"
        })
    }

   
    const token = setUser(user);
    res.cookie("token",token);

    // console.log("cont",user);

    return res.redirect("/");

    // return res.json({token}); // For authorization header
}

export {
    handleUserSignup,
    handleUserLogin
}