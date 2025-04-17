"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full'></div>
    </div>
  );
}
