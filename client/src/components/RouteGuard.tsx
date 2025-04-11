"use client";

import { useRouter } from "next/navigation";
import Navbar from './navbar';
import Loader from "@/components/loader";
import { socket } from "@/lib/socket";
import ReadTimeProvider from "@/components/RealTimeProvider";
import useAuthStore from '@/store/useAuthStore';

const RouteGuard = ({ 
    children, 
    accessLevel = "all", 
    redirectTo = "/login" 
}: { 
    children: React.ReactNode,
    accessLevel?: string,
    redirectTo?: string
 }) => {

  const {isAuthenticated, isLoading, initialized} = useAuthStore();
  const router = useRouter();

  if (isLoading || !initialized) return <Loader />;

  if(accessLevel === "auth" && !isAuthenticated){
    router.push(redirectTo);
  }

  if(accessLevel === "guest" && isAuthenticated){
    router.push('/');
  }

  return children;

//   return (
//     <ReadTimeProvider>
//         <div>
//             <Navbar />
//             <div className="main">
//             {children}
//             </div>
//         </div>
//     </ReadTimeProvider>
//   );
};

export default RouteGuard;