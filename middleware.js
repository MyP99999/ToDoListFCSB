// export { default } from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const { pathname, origin } = req.nextUrl;
        const { token } = req.nextauth;

        // if (pathname.startsWith('/dashboard') && token?.user?.role !== 'admin') {
        //     // Redirecting if the user is not an admin
        //     return NextResponse.redirect(origin).setHeader("Access-Control-Allow-Origin", "*");
        // }

        // Sending back a normal response with CORS headers
        return new NextResponse().setHeader("Access-Control-Allow-Origin", "*");
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token 
            }
        },
    }
)

export const config = {
    matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"]
}