"use client";

import { getAuthStatus } from "@/utils/auth";
import Navigator from "./navigator";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = getAuthStatus();
  
    if (isAuthenticated) {
      return <Navigator to="/" />;
    }
  
    return children;
  };

export default GuestGuard;