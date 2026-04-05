import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/util";

import { connectDB } from "@/lib/db";

export async function POST(req,res) {
    try{
        await connectDB();
        const {email,password}=await req.json();
        if(!email?.trim()){
            return NextResponse.json(
                {status:"error",message:"Email is required"},
                {status:400}
            )
        }
        if(!password?.trim()){
            return NextResponse.json(
                {status:"error",message:"Password is required"},
                {status:400}
            )
        }

        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {status:"error",message:"User does not exists, Try to Sign up"},
                {status:400}
            )
        }


        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return NextResponse.json(
                {status:"error",message:"Invalid credentials"},
                {status:400}
            )
        }

        const res = NextResponse.json({
                status: "success",
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin:user.isAdmin
                },
        });
        generateToken(user._id,res);
        return res
    }catch(err){
        console.log(err.message)
        return NextResponse.json(
            {status:"error",message:"Internal Server Error"},
            {status:500}
        )
    }
}