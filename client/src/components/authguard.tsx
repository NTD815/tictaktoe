"use client";

import { useState, useEffect } from 'react';
import { getAuthStatus } from "@/utils/auth";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if(!getAuthStatus()){
      router.push('/auth/login');
    }else{
      setLoading(false);
    }
    
  }, [router]);
  

  if (loading) return null;

  return children;
};

export default AuthGuard;