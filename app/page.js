'use client'
import { useAuthStore } from '@/store/useAutjStore'
import React from 'react'
import Signin from './(auth)/signin/page';
import Dashboard from './(protected)/dashboard/page';

const Home = () => {
  const {authUser}=useAuthStore();
  if(authUser) return(<Dashboard />
  )
  return (
    <Signin />
  )
}

export default Home
