import withAuth from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    console.log("Middleware: ", req.nextUrl.pathname, req.nextauth?.token?.role);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to profile for any authenticated user
        if (pathname.startsWith("/profile")) {
          return !!token;
        }
        
        // Admin routes
        if (pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }
        
        // HR routes
        if (pathname.startsWith("/hr")) {
          return token?.role === "HR";
        }
        
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    }
  }
)

export const config = {
  matcher: ["/profile", "/hr/:path*", "/admin/:path*"],
}
