import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected :)");
    } catch (error) {
        console.log("Mongodb Connection Error!!", error);
        process.exit(1);
    }
};

export default dbConnection;
