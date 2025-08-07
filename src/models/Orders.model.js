import mongoose,{Schema} from "mongoose";

const orderSchema=new mongoose.Schema({
  userEmail:{
    type:String
  },
  phone:{
    type:String
  },
  streetAdress:{
    type:String
  },
  postalCode:{
    type:String
  },
  cartProducts:{
    type:Object
  },
  paid:{
    type:Boolean,
    default:false
  }
},{timestamps:true})
export const OrderModel=mongoose.models?.Order || mongoose.model('Order',orderSchema)
