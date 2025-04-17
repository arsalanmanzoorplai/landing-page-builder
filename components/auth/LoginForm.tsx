"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/redux/store/Store";
import {
  loginWithEmailAsync,
  loginWithGoogleAsync,
} from "@/redux/features/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: ReduxState) => state.auth);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginWithEmailAsync({ email, password }) as any);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogleAsync() as any);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className='space-y-6'>
      <form onSubmit={handleEmailLogin} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-2 text-gray-500'>Or continue with</span>
        </div>
      </div>
      <Button
        type='button'
        variant='outline'
        className='w-full'
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <svg
          className='mr-2 h-4 w-4'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.64 12.2C20.64 11.5663 20.5827 10.9388 20.48 10.32H12V13.92H16.8C16.59 14.92 16 15.82 15.2 16.46V18.68H17.92C19.5 17.2325 20.64 14.9462 20.64 12.2Z'
            fill='#4285F4'
          />
          <path
            d='M12 21C14.43 21 16.47 20.22 17.92 18.68L15.2 16.46C14.36 17.01 13.28 17.34 12 17.34C9.65999 17.34 7.67999 15.75 6.95999 13.63H4.15999V15.91C5.57999 18.8 8.58 21 12 21Z'
            fill='#34A853'
          />
          <path
            d='M6.96001 13.63C6.76001 13.03 6.65 12.38 6.65 11.7C6.65 11.02 6.76001 10.37 6.96001 9.77V7.49H4.16001C3.57001 8.78 3.22 10.21 3.22 11.7C3.22 13.19 3.57001 14.62 4.16001 15.91L6.96001 13.63Z'
            fill='#FBBC05'
          />
          <path
            d='M12 6.06C13.33 6.06 14.53 6.52 15.47 7.42L17.93 4.96C16.46 3.58 14.43 2.76 12 2.76C8.58 2.76 5.58 4.96 4.16 7.85L6.96 10.13C7.68 8.01 9.66 6.42 12 6.42V6.06Z'
            fill='#EA4335'
          />
        </svg>
        Log in with Google
      </Button>
    </div>
  );
}
