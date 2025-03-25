import jwt from "jsonwebtoken";

const secret = "Ch@#8936JSGlahsdbJDHGbaHvdIag!12"

// Stateless Authentication
const setUser = (user) => {
    if(!user) return null;
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        secret
    );
}

const getUser = (token) => {
    if(!token) return null;
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
}


// Statefull Authentication
/*
const sessionIdToUserMap = new Map();

const setUser = (id,user) => {
    sessionIdToUserMap.set(id,user);
    // console.log("auth",user)
}

const getUser = (id) => {
    return sessionIdToUserMap.get(id);
    // console.log(id);
    // console.log(sessionIdToUserMap.get(id))
}
*/


export {
    setUser,
    getUser
}        
