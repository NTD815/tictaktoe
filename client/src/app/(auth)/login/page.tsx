"use client";

import { useState } from 'react';
import api from "@/utils/axios";
import { useRouter } from 'next/navigation';
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
            <div className="flex justify-center items-center min-h-screen background_cross_pattern">
                <div className="flex-grow min-w-[250px] max-w-[400px] sm:max-w-[600px] border border-yellow-500 rounded-xl m-5 p-5 bg-amber-600 bg-opacity-50">
                    <h1 className="text-white text-center font-bold text-2xl my-4">Login</h1>
                    <div className="flex flex-col min-full justify-center items-center">
                        <div className="my-2 w-[90%] sm:w-[75%]">
                            <input type="text" className="w-full text-red-600 font-bold sm:text-xl border p-2 sm:p-4 rounded-sm focus:outline-none" name="username" value={loginFormData.username} placeholder="Username" onChange={handleInputsChange} />
                        </div>
                        <div className="my-2 w-[90%] sm:w-[75%]">
                            <input type="password" className="w-full text-red-600 font-bold sm:text-xl border p-2 sm:p-4 rounded-sm focus:outline-none" name="password" value={loginFormData.password} placeholder="Password" onChange={handleInputsChange} />
                        </div>
                        <div className="my-5 w-[90%] sm:w-[75%]">
                            <button className="w-full text-white bg-red-700 p-2 sm:p-4 rounded-md" onClick={login} autoFocus>Login</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}