import dbConnect from "@/lib/dbConnect"
import { CategoryModel } from "@/models/categories.model"
import { MenuItemsModel } from "@/models/MenuItems.model"

export  async function POST(req){
  const {name}=await req.json()
  await dbConnect()
  const categoryDoc=await CategoryModel.create({name})
  return Response.json({
    message:"success",
    categoryDoc,
    status:200
  })
}

export async function PUT(req){
   await dbConnect()
   const {_id,name}=await req.json()
   await CategoryModel.updateOne({_id},{name})
   return Response.json({
     message:"Success",
     status:200
   })
}

export async function GET(){
    await dbConnect()
    const categories=await CategoryModel.find()
     return Response.json({
        categories
     })
}

export async function DELETE(req){
   await dbConnect()
   const url=new URL(req.url)
   const _id=url.searchParams.get('_id')
   await CategoryModel.deleteOne({_id})
   return Response.json(true)
}