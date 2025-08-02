import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from 'bcryptjs';


export async function POST(request){
    await dbConnect();
    try { 
        const {username,email,password}=await request.json()
        const existinguser=await UserModel.findOne({email})
        if(existinguser){
            return Response.json(
                {
                    success:false,
                    message:"User with this email is already  exist please login"
                },{status:200}
            )
        }
        const hashedPassword=await bcrypt.hash(password,10)
       const user= new UserModel({
            username,
            email,
            password:hashedPassword
        })
        await user.save()
         return Response.json(
                {
                    success:true,
                    message:"User registered seccessfully"
                },{status:201}
            )
    } catch (error) {
         console.error('Error registering user:', error);
         return Response.json(
         {
            success: false,
            message: 'Error registering user',
         },
         { status: 500 }
        );
    }
}