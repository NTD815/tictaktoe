"use client";

import { useState } from 'react';
import api from "@/utils/axios";
import { useRouter } from 'next/navigation';
import GuestGuard from "@/components/guestguard";
import { setAuthStatus } from '@/utils/auth';

export default function Login() {

    const [loginFormData, setLoginFormData] = useState<Record<string, string>>({
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        });
    }

    const login = async () => {
        api.post("/login", loginFormData).then((res: any) => {
            setAuthStatus();
            router.push("/");
        }).catch((err: any) => {
            console.log(err.response.data.error)
            alert(err.response.data.error);
        });
    }

    return (
        <GuestGuard>
            <div>
                <h1 className="text-black">Login</h1>
                <div className="flex flex-col min-w-[200px] w-[20%]">
                    <input type="text" className="border" name="username" value={loginFormData.username} placeholder="Username" onChange={handleInputsChange} />
                    <input type="password" className="border" name="password" value={loginFormData.password} placeholder="Password" onChange={handleInputsChange} />
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </GuestGuard>
    );
}