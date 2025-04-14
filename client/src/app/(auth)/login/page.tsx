"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import useAuthStore from "@/store/useAuthStore";
import { AuthData } from "@/types/user";
import {InlineLoader} from "@/components/loader"

export default function Login() {

    const [loginFormData, setLoginFormData] = useState<Record<string, string>>({
        username: "",
        password: ""
    });

    const router = useRouter();

    const { login, isLoading, error } = useAuthStore();

    const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        });
    }

    const handleLogin = async () => {
        const authData: AuthData = {
            username: loginFormData.username,
            password: loginFormData.password
        }

        try{
            await login(authData);
            router.push("/");
        }catch(error: any){
            //
        }
    }

    return (
            <div className="flex justify-center items-center min-h-screen background_cross_pattern">
                <div className="flex-grow min-w-[250px] max-w-[400px] sm:max-w-[600px] border border-yellow-500 rounded-xl m-5 p-5 bg-amber-600 bg-opacity-50">
                    <h1 className="text-white text-center font-bold text-2xl my-4">Login</h1>
                    {error ? <div className="text-white text-center">{error}</div> : null}
                    <div className="flex flex-col min-full justify-center items-center">
                        <div className="my-2 w-[90%] sm:w-[75%]">
                            <input type="text" className="w-full text-red-600 font-bold sm:text-xl border p-2 sm:p-4 rounded-sm focus:outline-none" name="username" value={loginFormData.username} placeholder="Username" onChange={handleInputsChange} />
                        </div>
                        <div className="my-2 w-[90%] sm:w-[75%]">
                            <input type="password" className="w-full text-red-600 font-bold sm:text-xl border p-2 sm:p-4 rounded-sm focus:outline-none" name="password" value={loginFormData.password} placeholder="Password" onChange={handleInputsChange} />
                        </div>
                        <div className="my-5 w-[90%] sm:w-[75%]">
                            <button className="w-full text-white flex justify-center bg-red-700 p-2 sm:p-4 rounded-md" onClick={handleLogin} autoFocus>
                                {isLoading ? <InlineLoader /> : 'Login'}
                            </button>
                            <div className="text-center text-white underline m-2">
                                <Link href="/">Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}