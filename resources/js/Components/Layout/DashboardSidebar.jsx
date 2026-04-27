import { usePage, Link } from "@inertiajs/react";

const menuItems = [
    { href: "/dashboard", icon: "🏠", label: "Dashboard" },
    { href: "/dashboard/users", icon: "🏠", label: "Users" },
];

export default function DashboardSidebar({ sidebarOpen }) {
    const { props, url } = usePage();
    const { appName } = props;

    const isActive = (href) => url === href;

    return (
        <aside
            className={`
                fixed md:static z-30 h-full w-56
                bg-primary-dark text-white flex flex-col
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-primary">
                <span className="text-xl">🚀</span>
                <span className="font-bold text-sm tracking-wide uppercase">
                    {appName}
                </span>
            </div>

            {/* Menu */}
            <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        preserveState
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg
                            text-sm font-medium transition-colors duration-150
                            ${
                                isActive(item.href)
                                    ? "bg-primary"
                                    : "hover:bg-white/10"
                            }
                        `}
                    >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-2 py-3 border-t border-primary">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20
                        text-sm font-medium transition-colors duration-150"
                >
                    <span className="text-base">🚪</span>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
}
