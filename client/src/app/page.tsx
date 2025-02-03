"use client";

import { useState, useEffect } from 'react';
import api from "@/utils/axios";
import AuthGuard from "@/components/authguard";
import Link from 'next/link';
import { socket } from "@/utils/socket";

export default function Home() {

    useEffect(() => {
        api.get("/me").then((res: any) => {
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        socket.connect();

        return () => { socket.disconnect() };
    }, [])

    return (
        <AuthGuard>
            <div>
                Homepage they call me iykwim
            </div>
        </AuthGuard>
    );
}