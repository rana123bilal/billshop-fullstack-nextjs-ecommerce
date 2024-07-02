import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    let isPublicRoute = false
    if (request.nextUrl.pathname === '/auth/login' ||
        request.nextUrl.pathname === '/auth/register') {
        isPublicRoute = true
    }

    const token = request.cookies.get('token')?.value || '';
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/login', '/auth/register', '/']
}