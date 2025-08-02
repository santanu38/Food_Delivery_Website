import mongoose,{Schema} from "mongoose";


const userShema=new mongoose.Schema({
    username:{
       type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
       type:String,
       required:[true,'password is required'] 
    },
    image:{
        type:String
    }
},{timestamps:true})

export const UserModel=mongoose.models?.User || mongoose.model('User',userShema)