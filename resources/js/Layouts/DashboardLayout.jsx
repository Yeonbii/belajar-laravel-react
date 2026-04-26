import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

// Berdasarkan laravel starter kit
// Tinggi navbar => h-16
// Widtth Sidebar => 16rem
// Widtth Sidebar Mobile => 18rem
// Widtth Sidebar Icon => 3rem

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(() => {
        return JSON.parse(localStorage.getItem("sidebar")) || false;
    });

    const { url } = usePage();

    useEffect(() => {
        localStorage.setItem("sidebar", JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <div className="flex">
            <div
                className={`h-screen bg-primary-dark text-white transition-all duration-300 overflow-hidden
                ${collapsed ? "w-0 md:w-16" : "w-64"}`}
            >
                <nav className="mt-4 flex flex-col gap-2">
                    <Link
                        href="/dashboard"
                        className={`px-4 py-2 hover:bg-primary ${url.startsWith("/dashboard") ? "bg-primary" : ""}`}
                    >
                        {collapsed ? "🏠" : "Dashboard"}
                    </Link>
                </nav>
            </div>
            <div className="flex-1 p-4">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 m-2 bg-primary rounded"
                >
                    {collapsed ? "➡️" : "⬅️"}
                </button>
                {children}
            </div>
        </div>
    );
}
