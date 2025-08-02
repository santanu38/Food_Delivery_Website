import mongoose,{Schema} from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

export const CategoryModel=mongoose.models?.Category || mongoose.model('Category',categorySchema)