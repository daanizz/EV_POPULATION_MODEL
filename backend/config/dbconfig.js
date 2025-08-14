import mongoose from "mongoose";

const dbConnection=async()=>{
    try{
        const mongoConnection=await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected :)")
    }
    catch(error){
        console.log("Mongodb Connection Error!!")
        process.exit(1)
    }
    
}

export default dbConnection;