"use client";

import { useEffect, useState } from "react";
import { verifyAuth } from "@/utils/auth";
import Loader from "./loader";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Quick token validation or lightweight auth check
          await verifyAuth();
        } catch (error) {
        //   signOut();
        } finally {
          setIsLoading(false);
        }
      };
      
      checkAuth();
    }, []);
  
    if (isLoading) {
      return <Loader />; // Or whatever loading state you prefer
    }

    //Redirection to login page is handle in the Axios interceptor and will be handled there itself
    //along with the retry login, so no need to handle it here
  
    return children;
  };

export default AuthGuard;