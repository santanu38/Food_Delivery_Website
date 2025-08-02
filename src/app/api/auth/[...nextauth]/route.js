import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import clientPromise from "@/lib/mongoConnect";



export const authOptions={
  secret:process.env.NEXTAUT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
   }),
  CredentialsProvider({
    name: 'Credentials',
    
    credentials: {
      username: { label: "Email", type: "email", placeholder: "test@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      console.log("Credentials:", credentials); 
    const email=credentials?.email
    const password=credentials?.password
    await dbConnect()
    try {
      const user=await UserModel.findOne({email})
      if(!user){
        return null
      }
      const isPasswordCorrect=await bcrypt.compare(
        password,
        user.password
      )
      if(isPasswordCorrect){
        return user
      }
    } catch (error) {
      throw new Error(error.message || "Login failed")
    }
    //  console.log(credentials);
      return null
    }
  })
],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username; 
      }
      return session;
    }
  },
   session: {
    strategy: 'jwt',
  },

}

const handler=NextAuth(authOptions)
export {handler as GET ,handler as POST}

