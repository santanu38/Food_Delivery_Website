import dbConnect from "@/lib/dbConnect";
import { MenuItemsModel } from "@/models/MenuItems.model";

export async function POST(req){
    await dbConnect();
    const data=await req.json()
    console.log(data);
    
    const menuItemsDoc=await MenuItemsModel.create(data)
    return Response.json({
        menuItemsDoc
    })
}

export async function GET(){
    await dbConnect()
    const menuItems=await MenuItemsModel.find()
    return Response.json({
        menuItems
    })
}

export async function PUT(req){
    await dbConnect()
    const {_id,...data}=await req.json()
    console.log("handling category update err",data);
    
     await MenuItemsModel.findByIdAndUpdate(_id,data) 
     return Response.json({
        message:"success"
     })
}

export async function DELETE(req){
    await dbConnect()
    const url=new URL(req.url)
    const _id=url.searchParams.get('_id')
    await MenuItemsModel.deleteOne({_id})
    return Response.json(true)
}