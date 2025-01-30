"use client";

import { useRouter } from 'next/navigation';

export default function Navigator({to}: {to: string}) {
    
    const router = useRouter();

    router.push(to);

    return <></>
}