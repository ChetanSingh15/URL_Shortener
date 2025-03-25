import mongoose from "mongoose";

const DB_NAME = "URL_Shortener" 

// const MONGODB_URI = "mongodb+srv://Chetan:<Your Password>@cluster0.stgum.mongodb.net"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected!! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB Connection Failed",error)
        process.exit(1)
    }
}

export default connectDB