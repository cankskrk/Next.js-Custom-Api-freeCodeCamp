import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/login" || path ==="/signup"
    const token = request.cookies.get("token")?.value || ""

    // if it's public page and you have a token
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

}

export const config = {
    matcher: ["/", "/profile/:path*", "/login", "/signup", "/profile"]
}