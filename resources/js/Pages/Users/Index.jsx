import { Head, Link } from "@inertiajs/react";
import { useMemo } from "react";

/* =======================
   UI COMPONENTS
======================= */

function Avatar({ name }) {
    const initials = useMemo(() => {
        if (!name) return "";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

        return (words[0][0] + words[1][0]).toUpperCase();
    }, [name]);

    return (
        <div className="w-9 h-9 bg-blue-300 text-white rounded-full flex justify-center items-center font-semibold shrink-0">
            {initials}
        </div>
    );
}

function PaginationButton({ children, url, active = false }) {
    const baseClass =
        "min-w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all";

    if (active) {
        return (
            <span
                className={`${baseClass} bg-white text-slate-600 border-slate-300`}
            >
                {children}
            </span>
        );
    }

    if (url) {
        return (
            <Link
                href={url}
                className={`${baseClass} bg-white text-slate-600 border-slate-300 hover:bg-slate-50`}
            >
                {children}
            </Link>
        );
    }

    return (
        <span
            className={`${baseClass} border-slate-200 text-slate-300 bg-slate-50`}
        >
            {children}
        </span>
    );
}

function Pagination({ pagination, anchor = null }) {
    if (pagination.total <= pagination.per_page) return null;

    const prev_page_url = pagination.prev_page_url
        ? anchor
            ? `${pagination.prev_page_url}#${anchor}`
            : pagination.prev_page_url
        : null;

    const next_page_url = pagination.next_page_url
        ? anchor
            ? `${pagination.next_page_url}#${anchor}`
            : pagination.next_page_url
        : null;

    return (
        <div className="flex items-center justify-between mt-10 px-2 py-4 border-t border-slate-200">
            <div className="text-sm text-slate-500">
                Hal{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.current_page}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.last_page}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <PaginationButton url={prev_page_url}>←</PaginationButton>

                <PaginationButton active>
                    {pagination.current_page}
                </PaginationButton>

                <PaginationButton url={next_page_url}>→</PaginationButton>
            </div>
        </div>
    );
}

/* =======================
   FEATURE COMPONENTS
======================= */

function UserItem({ item }) {
    return (
        <li className="border-b border-slate-100 p-3 hover:bg-slate-50 transition-colors rounded-lg">
            <div className="flex items-center gap-4">
                <Avatar name={item.name} />
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-900 truncate">
                        {item.name}
                    </span>
                    <span className="text-slate-500 text-sm truncate">
                        {item.email}
                    </span>
                </div>
            </div>
        </li>
    );
}

function UserList({ items, pagination }) {
    const anchor = "user-list";

    return (
        <div id={anchor} className="p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 sticky top-0 py-3 border-b bg-white z-10 text-slate-800">
                User List
            </h2>

            {items.length > 0 ? (
                <ul className="space-y-3">
                    {items.map(item => (
                        <UserItem key={item.id} item={item} />
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500 italic text-center py-10">
                    Belum ada data user.
                </p>
            )}

            <Pagination pagination={pagination} anchor={anchor} />
        </div>
    );
}

/* =======================
   PAGE COMPONENT
======================= */

export default function Index({ users }) {
    // ✅ Data shaping (inti dari perbaikan)
    const items = users.data;
    const pagination = users;

    return (
        <>
            <Head title="Users Page" />

            <div className="flex flex-wrap max-w-7xl mx-auto">
                {/* Form */}
                <div className="p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">
                        Create User
                    </h2>
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-center">
                        Form Input Here
                    </div>
                </div>

                {/* List */}
                <UserList items={items} pagination={pagination} />
            </div>
        </>
    );
}
