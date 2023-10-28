// Inside your Next.js API route
import { OAuth2Client } from 'google-auth-library';
import User from "@/models/userModel";
import connectDB from "@/utils/database";

export async function POST(req, res){
    const client = new OAuth2Client(process.env.GOOGLE_ID);
    const { idToken } = req.body;

    connectDB()

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_ID,
        });
        const { email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, name, picture, provider: 'google' });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Google auth failed' });
    }
};
