"use client";

import { useState, useEffect } from 'react';
import { getAuthStatus } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Navbar from './navbar';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if(!getAuthStatus()){
      router.push('/login');
    }else{
      setLoading(false);
    }
    
  }, [router]);
  

  if (loading) return null;

  return (
    <div>
        <Navbar />
        <div className="main">
          {children}
        </div>
    </div>
  );
};

export default AuthGuard;