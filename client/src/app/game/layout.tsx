"use client";

import Themes from "@/components/themes";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-white">
            <Themes />
            {children}
        </div>
        );
}