import { getUser } from "../services/auth.js";

const checkForAuthentication = (req, res, next) => {
    const cookietoken = req.cookies?.token;
    req.user = null;

    if(!cookietoken){
        return next();
    }

    const token = cookietoken;
    const user = getUser(token);

    req.user = user;
    next();
}

const restrictTo = (roles = []) => {
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next()
    }
}

export {
    checkForAuthentication,
    restrictTo
}

/*
const restrictToLoggedInUserOnly = async (req, res, next) => {
    const userUid = req.cookies?.uid;
    
    if(!userUid){
        return res.redirect("/login");
    }
    
    // console.log("USeruid",userUid)
    const user = getUser(userUid);
    
    // console.log("authMiddle",user);
    
    if(!user){
        return res.redirect("/login");
    }
    
    req.user = user;
    next();
    
    // const userUid = req.headers["authorization"] // Through authorization headers
    // // console.log(userUid);
    // // console.log(req.headers)
    // // console.log(req.headers["authorization"]);
    // const token = userUid.split("Bearer ")[1];
    // const user = getUser(token);
}

const checkAuth = async (req, res, next) => {
    const userUid = req.cookies?.uid;
    
    
    const user = getUser(userUid);
    
    
    
    req.user = user;
    next();

    // const userUid = req.headers["authorization"];  // Through authorization headers 
    // console.log(userUid);
    // console.log(req.headers)
    // console.log(req.headers["authorization"]);
    // const token = userUid.split("Bearer ")[1];
    // const user = getUser(token);
}
*/

