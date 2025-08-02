import mongoose,{Schema} from "mongoose";

const extraPriceSchema=new mongoose.Schema({
   name:String,
   price:Number
});

const menuItemsSchema=new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    basePrice:{
        type:Number
    },
    category:{
        type:mongoose.Schema.Types.ObjectId
    },
    sizes:{
        type:[extraPriceSchema]
    },
    extraIngredientPrices:{
        type:[extraPriceSchema]
    }
},{timestamps:true})

export const MenuItemsModel=mongoose.models?.MenuItems || mongoose.model('MenuItems',menuItemsSchema)