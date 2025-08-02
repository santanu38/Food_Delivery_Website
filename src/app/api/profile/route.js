import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserModel } from "@/models/user.model";
import { UserInfoModel } from "@/models/userInfo.model";


export async function PUT(req) {
     await dbConnect()
    const data= await req.json()
    console.log(data);
    
    const {_id,username,image,...otherUserInfo}=data
    
    let filter={}
   if(_id){
    filter={_id}
   }else{
       const session=await getServerSession(authOptions)
       const email=session?.user?.email
       filter={email}
   }
    
    const user=await UserModel.findOne(filter)
    await UserModel.updateOne(filter,{username,image})

    await UserInfoModel.findOneAndUpdate({email:user.email},otherUserInfo,{upsert:true})

    return Response.json({
        status:200,
        message:"user profile updated succesfully"
    })
}

export async function GET(req){
    await dbConnect()

    const url=new URL(req.url)
    const _id=url.searchParams.get('_id')

    let filteruser={}
    if(_id){
        filteruser={_id}
    }else{
        const session=await getServerSession(authOptions)
        const email=session.user?.email
        if(!email){
            return Response.json({})
        }
        filteruser={email}
    }
    const user=await UserModel.findOne(filteruser).lean()
    const userInfo=await UserInfoModel.findOne({email:user.email}).lean()
    return Response.json({...user,...userInfo})

}