import connectDB from "./db/index.js";
import { app } from "./app.js"

const Port = 8001;


connectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("Error: ",error)
    })
    app.listen(Port,() => {
        console.log(`Server is running on port: ${Port}`)
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed!!",err)
})


