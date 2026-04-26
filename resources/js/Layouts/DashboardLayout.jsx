import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Avatar from "@/Components/ui/Avatar";

// Daftar menu sidebar — tinggal tambah item di sini kalau mau
const menuItems = [{ href: "/dashboard", icon: "🏠", label: "Dashboard" }];

export default function DashboardLayout({ children }) {
    // sidebarOpen khusus untuk layar HP (mobile)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { url, props: { auth } } = usePage();

    // Fungsi cek apakah link ini sedang aktif
    const isActive = href => url.startsWith(href);

    const avatarUrl = auth.user.avatar ? `/storage/${auth.user.avatar}` : null;

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {/* ================================
                OVERLAY — muncul di HP saat sidebar terbuka
                Kalau diklik, sidebar tertutup lagi
            ================================ */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ================================
                SIDEBAR
            ================================ */}
            <aside
                className={`
                    fixed md:static z-30 h-full w-56
                    bg-gray-900 text-white
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Logo / Judul Aplikasi */}
                <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
                    <span className="text-xl">🚀</span>
                    <span className="font-bold text-sm tracking-wide uppercase text-white/80">
                        MyApp
                    </span>
                </div>

                {/* Daftar Menu */}
                <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
                    {menuItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg
                                text-sm font-medium transition-colors duration-150
                                ${
                                    isActive(item.href)
                                        ? "bg-indigo-600 text-white"
                                        : "text-white/60 hover:bg-white/10 hover:text-white"
                                }
                            `}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Bagian bawah sidebar: tombol Logout */}
                <div className="px-2 py-3 border-t border-white/10">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                            text-red-400 hover:bg-red-500/20 hover:text-red-300
                            text-sm font-medium transition-colors duration-150"
                    >
                        <span className="text-base">🚪</span>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* ================================
                KONTEN UTAMA (kanan sidebar)
            ================================ */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* --- HEADER / NAVBAR ATAS --- */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
                    {/* Tombol buka sidebar di HP */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                        ☰
                    </button>

                    {/* Judul halaman */}
                    <h1 className="text-gray-800 font-semibold text-lg">
                        Dashboard
                    </h1>

                    {/* Spacer — mendorong item ke kanan */}
                    <div className="flex-1" />

                    {/* Avatar / Info User */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 hidden sm:block">
                            {auth.user.name}
                        </span>
                        <Avatar name={auth.user.name} src={avatarUrl} />
                    </div>
                </header>

                {/* --- AREA KONTEN HALAMAN --- */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
