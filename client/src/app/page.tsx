"use client";

import { useState, useEffect } from 'react';
import api from "@/lib/axios";
import RouteGuard from "@/components/RouteGuard";
import Link from 'next/link';
import { socket } from "@/lib/socket";

export default function Home() {

    return (
        <RouteGuard accessLevel="auth">
            <div className="">
                
            </div>
        </RouteGuard>
    );
}