"use client";

import Link from "next/link";
import api from "@/utils/axios";

export default function Navbar() {

    const logout = () => {
        api.post("/logout").then(() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
        }).catch((err: any) => {
            console.log(err?.response?.data?.error);
        });
    }

    return (
        <div className="top-0 left-0 right-0 p-5 text-2xl font-bold bg-gradient-to-b from-zinc-500 via-zinc-900 to-black text-white flex gap-5">
            <Link href="/">Home</Link>
            <Link href="/game">Game</Link>
            <div className="cursor-pointer" onClick={logout}>Logout</div>
        </div>
    );
}