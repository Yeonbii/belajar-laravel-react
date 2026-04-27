import Avatar from "@/Components/UI/Avatar";

export default function DashboardHeader({ username, avatarUrl, openSidebar }) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
            {/* Button mobile */}
            <button
                onClick={openSidebar}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
                ☰
            </button>

            <h1 className="text-gray-800 font-semibold text-lg">
                Dashboard
            </h1>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:block">
                    {username}
                </span>
                <Avatar name={username} avatarUrl={avatarUrl} />
            </div>
        </header>
    );
}