import User from "@/models/userModel";
import connectDB from "@/utils/database";
import NextAuth from "next-auth/next";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request){
    const { email, password } = await request.json();
    connectDB()
    const user = await User.findOne({ email }).select('-password');  // Exclude password
    if(!user) throw new Error("Email does not existst!")

    const compare = await bcrypt.compare(password, user.password)
    if(!compare) throw new Error("Password do not match!")

    return NextResponse.json({ ...user._doc, _id: user._id.toString() }, { status: 201 });
}