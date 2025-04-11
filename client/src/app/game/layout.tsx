"use client";

import Themes from "@/components/themes";
import AuthGuard from "@/components/RouteGuard";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="text-white relative">
                <Themes />
                {children}
            </div>
        </AuthGuard>
        );
}