'use client'
import { useAuthStore } from '@/store/useAutjStore'
import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router=useRouter();
  const {authUser,isCheckingAuth}=useAuthStore();
    useEffect(() => {
      if (!isCheckingAuth) {
        if (authUser) {
          router.replace("/dashboard");
        } else {
          router.replace("/signin");
        }
      }
    }, [authUser, isCheckingAuth]);
  
  
    return (
      <div className="flex items-center justify-center min-h-screen">
       <p>Loading...</p>
      </div>
    );
}

export default Home
