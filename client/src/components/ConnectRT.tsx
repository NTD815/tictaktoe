"use client";

import { useEffect } from 'react';
import useConnectionStore from '@/store/useConnectionStore';

export default function ConnectRT() {
    const { connect, disconnect, registerSync } = useConnectionStore();

    useEffect(() => {
        const cleanupRegister = registerSync();
        connect();
        return () => {
            disconnect();
            cleanupRegister();
        };
    }, []);

    return <></>;
}