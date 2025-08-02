import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";

export async function GET(){
   await dbConnect()
   const users=await UserModel.find()
   return Response.json({users})
}