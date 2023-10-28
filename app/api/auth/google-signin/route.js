// Import required libraries and modules
import { OAuth2Client } from 'google-auth-library';
import User from "@/models/userModel";
import connectDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { idToken } = await request.json();  // Extract idToken from the request body
    connectDB();  // Establish database connection

    const client = new OAuth2Client(process.env.GOOGLE_ID);  // Create OAuth2 client

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_ID,
        });
        const { email, name, picture } = ticket.getPayload();  // Get user details from the token payload

        let user = await User.findOne({ email });  // Check if user already exists
        if (!user) {
            user = new User({ email, name, picture, provider: 'google' });  // Create new user if not found
            await user.save();
        }

        return NextResponse.json({ ...user._doc, _id: user._id.toString() }, { status: 201 });  // Return user data as JSON
    } catch (error) {
        return NextResponse.json({ error: 'Google auth failed' }, { status: 400 });  // Handle errors
    }
}
