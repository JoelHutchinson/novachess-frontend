import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

import { fetchUser } from '@/app/_lib/data-service';
import { compare } from 'bcrypt-ts';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
            .object({ username: z.string(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            const user = await fetchUser(username);
            if (!user) return null;

            let passwordsMatch = false;

            try {
              passwordsMatch = await compare(password, user.password);
              
            }
            catch (error) {
              console.log("Error matching passwords: " + error);
              return null;
            }

            if (passwordsMatch) return user;
          }
   
          console.log('Invalid credentials');
          return null;
        },
      }),
    ],
  });