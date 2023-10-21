import User from "@/models/userModel";
import connectDB from "@/utils/database";
import NextAuth from "next-auth/next";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, password } = await request.json();
    const user = await User.findOne({ email: email });
    if (user) throw new Error('Email already exists!');

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
    }

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return NextResponse.json({ message: "User Created" }, { status: 201 });
}
