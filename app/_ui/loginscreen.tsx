'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/_lib/actions';


import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function LoginScreen() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage: 'url("/galaxy.png")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <form action={dispatch} className="space-y-3">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src="./galaxy-pawn.png" width="50" alt="" srcSet="" />
              <h1 className="mb-2 mt-2 text-2xl">Welcome to Novachess</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-purple-500 bg-opacity-50 px-6 py-2 text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" id="username" type="username" name="username" placeholder="Username" required />
              </div>
              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-purple-500 bg-opacity-50 px-6 py-2 text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" id="password" type="password" name="password" placeholder="Password" required />
              </div>
              <div className="mt-8 flex flex-col justify-center items-center text-lg">
                <LoginButton />
                {errorMessage && (
                  <div
                    className="mt-2 flex items-center space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </div>
                )}

                <p className="text-center text-sm mt-4">
                    {"Don't have an account? "}
                    <Link href="/register" className="font-semibold text-gray-500 transition-colors duration-300 hover:text-yellow-600">
                    Sign up
                    </Link>
                    {' for free.'}
                </p>
              </div>
          </div>
        </div>
      </form>
    </div>
    );
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button
      className="rounded-3xl bg-purple-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
      aria-disabled={pending}
      type='submit'>
      Log in 

    </button>
  );
}