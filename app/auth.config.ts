import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;

      if (!isLoggedIn) {
        if (nextUrl.pathname.startsWith('/register')) {
          return true
        };
        return false; // Redirect unauthenticated users to login page
      }

      let isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return true;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
        session.user = token.user as any
        return session
    }
  },
} satisfies NextAuthConfig;