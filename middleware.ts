import withAuth from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
    newUser: "/"
  }
})

export const config = {
  matcher: ["/profile", "/hr/:path*", "/admin/:path*"],
}
