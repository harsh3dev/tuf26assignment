import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const tokenCookie = req.cookies.get('authToken');
    const token = tokenCookie ? tokenCookie.value : '';

    try {
        if (token) {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
            if (pathname.startsWith('/admin')) {
                if (!payload.admin) {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        } else if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'], 
};
