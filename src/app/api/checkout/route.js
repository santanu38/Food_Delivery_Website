import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { authOptions } from "../auth/[...nextauth]/route";
import { OrderModel } from "@/models/Orders.model";
import { MenuItemsModel } from "@/models/MenuItems.model";

const razorpay=new Razorpay({ 
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
    key_secret:process.env.RAZOR_PAY_SECRET_ID 
})

export async function POST(req){
    await dbConnect()

    const {cartProduct,address}=await req.json()
    //  console.log("from checkout route",cartProduct);
    
    const session=await getServerSession(authOptions)
    const userEmail=session?.user?.email

     const orderDoc=await OrderModel.create({
       userEmail,
       ...address,
       cartProduct,
       paid:false
     })

     let amount=0;

    for(const product of cartProduct){
        const productInfo=await MenuItemsModel.findById(product._id)
        // console.log(productInfo);
        
        let productPrice=productInfo.basePrice;

        if(product.size){
            const size=productInfo.sizes.find((size)=>size._id.toString() ===product.size._id.toString())
            // console.log("Size has",size);
            productPrice+=size.price
        }

        if(product.extras?.length>0){
            for(const extra of product.extras){
                const extraInfo=productInfo.extraIngredientPrices.
                find((ex)=>ex._id.toString()===extra._id.toString())
                productPrice+=extraInfo.price
            }
        }
        console.log("price",productPrice);
        
        amount+=productPrice*100
    }
    amount+=500

    const razorpayOrder=await razorpay.orders.create({
        amount:amount,
        currency:"USD",
        receipt:orderDoc._id.toString(),
        notes:{
            orderId:orderDoc._id.toString(),
            email:userEmail
        }
    })
    return Response.json({
        id:razorpayOrder._id,
        amount:razorpayOrder.amount,
        currency:razorpayOrder.currency,
        orderId:orderDoc._id.toString()
    })
}