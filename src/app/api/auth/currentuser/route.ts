import { validateJWT } from "@/app/helpers/validateJWT";
import connectDB from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const user = await User.findById(userId).select('-password');
        console.log('user', user)
        return NextResponse.json({
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({
            message : error.message
        },{
            status: 400
        })
    }
}