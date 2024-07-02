import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        message: "You have been logged out",
    })

    response.cookies.delete("token")
    return response;
}