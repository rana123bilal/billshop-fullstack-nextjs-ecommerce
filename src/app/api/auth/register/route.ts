import connectDB from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyptjs from 'bcryptjs';
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userExist = await User.findOne({ email: reqBody.email });
        if(userExist){
            throw new Error('User already exists');
        }
        const salt = await bcyptjs.genSalt(10);
        const hashedPassword = await bcyptjs.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;
        const newUser = new User(reqBody);
        await newUser.save();
        return NextResponse.json({
            message: 'User registered successfully',
            return: newUser,
        })
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