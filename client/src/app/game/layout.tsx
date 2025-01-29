"use client";

import Themes from "@/components/themes";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Themes />
            {children}
        </div>
        );
}