import express from "express";
const app = express()
import { URL } from "./models/url.model.js";
import path from "path";
import cookieParser from "cookie-parser";
import { checkForAuthentication , restrictTo } from "./middlewares/auth.middleware.js";

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuthentication);


// routes
import urlRoute from "./routes/url.routes.js"
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.routes.js"


// routes declaration
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute)
app.use("/",staticRoute)
app.use("/user",userRoute)



app.get("/url/:shortID",async (req,res) => {
    const shortID = req.params.shortID;
    
    const entry = await URL.findOneAndUpdate(
        {shortID},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    )

    res.redirect(entry.redirectURL)
})




export{ app }