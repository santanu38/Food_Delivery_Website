import {email, z} from 'zod'

export const signUpSchema=z.object({
    email:z.string().email({message:'Invalid email adress'}),
    password:z.string().min(6,{message:'password must be atleasst 6 characters'})
})