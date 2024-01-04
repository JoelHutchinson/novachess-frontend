/*
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { fetchUser } from '@/app/_lib/data-service';
import { authConfig } from '@/app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await fetchUser(email);
        if (!user) return null;
        let passwordsMatch = await compare(password, user.password);
        if (passwordsMatch) return user as any;
      
        return null;
        },
    }),
  ],
});
*/

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

import { fetchUser } from '@/app/_lib/data-service';
import bcrypt from 'bcrypt-ts';
 
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
            .object({ email: z.string().email(), password: z.string().min(1) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await fetchUser(email);
            if (!user) return null;
            //const passwordsMatch = await bcrypt.compare(password, user.password);
            const passwordsMatch = password === user.password;
            
            if (passwordsMatch) return user;
          }
   
          console.log('Invalid credentials');
          return null;
        },
      }),
    ],
  });