import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
                                req.nextUrl.pathname.startsWith('/admin')
        
        // If accessing protected route, require authentication
        if (isProtectedRoute) {
          return !!token
        }
        
        // Allow access to public routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}