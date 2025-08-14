import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const userModel=new mongoose.Schema({
    "name":{
        type: String,
        required: true
    },
    "email":{
        type:String,
        required:true
    },
    "hashPassword":{
        type:String,
        required:true
    }
    },
    {
        timestamps:true
    }
)


userModel.pre('save',async function(next){
    if(!this.isModified("hashPassword")) return next();
    try {
        const salt=await  bcrypt.genSalt(10);
        this.hashPassword=await bcrypt.hash(this.hashPassword,salt);
        next();
    } catch (error) {
        next(error)
    }     
})//last done here, need to study the difference between => and just function next(), also the similar one used in react(dont remember exactly)..

export default mongoose.model("user",userModel)