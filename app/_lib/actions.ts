'use server';

import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { fetchUser, createUser } from './data-service';
  
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(formData: FormData) {
  let email = formData.get('email') as string;
  let password = formData.get('password') as string;
  let user = await fetchUser(email);

  if (user) {
    return 'User already exists';
  } else {
    await createUser(email, password);
    redirect('/login');
  }
}