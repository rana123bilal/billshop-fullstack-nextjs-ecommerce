import connectDB from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const user = await User.findOne({ email: reqBody.email });
        if (!user) {
            throw new Error('User does not found');
        }
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, { expiresIn: '7d' });
        const response = NextResponse.json({
            message: 'User logged in successfully',
        });
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
        });
        return response;



        // const passwordMatch = await bcrypt.compare(reqBody.password, user.password);

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 400,
            }
        );
    }

}