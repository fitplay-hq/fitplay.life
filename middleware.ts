import withAuth from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    console.log("Middleware: ", {
      pathname: req.nextUrl.pathname,
      role: req.nextauth?.token?.role,
      hasToken: !!req.nextauth?.token,
      userId: req.nextauth?.token?.id,
    });
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        console.log("Middleware authorized check:", {
          pathname,
          hasToken: !!token,
          role: token?.role,
          email: token?.email
        });
        
        // Allow access to profile for any authenticated user
        if (pathname.startsWith("/profile")) {
          const authorized = !!token;
          console.log("Profile access check:", { authorized, token: !!token });
          return authorized;
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
  matcher: ["/profile", "/hr/:path*", "/admin/:path*","/cart","/course","/coursepage"],
}
