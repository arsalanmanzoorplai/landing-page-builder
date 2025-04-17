"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "@/redux/store/Store";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fullReset } from "@/redux/features/templateSlice";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: ReduxState) => state.auth);

  useEffect(() => {
    // Reset template state when auth page loads
    dispatch(fullReset());

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, dispatch]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Welcome to TravelTour
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Create beautiful travel websites in minutes
          </p>
        </div>

        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>
              {activeTab === "login"
                ? "Sign in to your account"
                : "Create an account"}
            </CardTitle>
            <CardDescription>
              {activeTab === "login"
                ? "Enter your credentials below to sign in"
                : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-2 mb-6'>
                <TabsTrigger value='login'>Login</TabsTrigger>
                <TabsTrigger value='register'>Register</TabsTrigger>
              </TabsList>
              <TabsContent value='login'>
                <LoginForm />
              </TabsContent>
              <TabsContent value='register'>
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
