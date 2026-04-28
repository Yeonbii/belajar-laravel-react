import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../Components/Layout/DashboardSidebar";
import DashboardHeader from "../Components/Layout/DashboardHeader";

function getSidebarState() {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebarOpen") === "true";
}

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(getSidebarState);

    useEffect(() => {
        localStorage.setItem("sidebarOpen", sidebarOpen);
    }, [sidebarOpen]);

    // Kunci scroll saat sidebar terbuka
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup saat komponen hilang
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    const { props } = usePage();
    const user = props.auth.user;

    return (
        <div className="flex h-screen overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <DashboardSidebar sidebarOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    username={user.name}
                    avatarUrl={user.avatar}
                    openSidebar={() => setSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}