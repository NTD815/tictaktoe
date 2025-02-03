
import GuestGuard from "@/components/guestguard";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <GuestGuard>{children}</GuestGuard>
    );
}