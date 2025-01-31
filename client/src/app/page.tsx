"use client";

import { useState, useEffect } from 'react';
import api from "@/utils/axios";
import AuthGuard from "@/components/authguard";
import Link from 'next/link';

export default function Home() {

    useEffect(() => {
        api.get("/me").then((res: any) => {
            console.log(res.data);
        });
    }, []);

    return (
        <AuthGuard>
            <div>
                <Link href="/game">Game</Link>
                Homepage they call me iykwim
            </div>
        </AuthGuard>
    );
}