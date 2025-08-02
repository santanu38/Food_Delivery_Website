import mongoose,{Schema} from "mongoose";

const userInfoSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    streetAdress:{
        type:String,
    },
    postalCode:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    phone:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const UserInfoModel=mongoose.models?.UserInfo || mongoose.model("UserInfo",userInfoSchema)
