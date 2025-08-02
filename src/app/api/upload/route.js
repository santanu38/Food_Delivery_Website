import dbConnect from '@/lib/dbConnect'
import {v2 as cloudinary} from 'cloudinary'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { UserModel } from '@/models/user.model'

//clodinary config
 cloudinary.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_API_SECRET
 })

export async function POST(req){
    try {
        await dbConnect()

        const session=await getServerSession(authOptions)
        const email=session?.user?.email

        const data=await req.formData()
        // console.log(data);
        const file=data.get('file')
        if(file){
            //upload the file
            const arrayBuffer=await file.arrayBuffer()
            const buffer=Buffer.from(arrayBuffer)

            //  Upload with buffer using upload_stream().end(buffer)
            const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                if (error) reject(error)
                else resolve(result)
                }
            )

            uploadStream.end(buffer) //  correct way to send Buffer
            })
            console.log("from upload",result);
           return Response.json({
           message: 'Image uploaded ',
           imageUrl:result.secure_url,
           status: 200,
           })
        }else{
            return Response.json({
                masssege:"file not found",
                status:400
            })
        }
    } catch (error) {
        console.error(error)
        return Response.json({
        message: 'Upload failed',
        error: error.message,
        status: 500,
        })
    }
    
}