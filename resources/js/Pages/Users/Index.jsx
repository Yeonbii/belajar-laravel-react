import { Head, Link } from "@inertiajs/react";
import { useMemo } from "react";

// Komponen Avatar (Sudah Oke)
function Avatar({ name }) {
    const initials = useMemo(() => {
        if (!name) return "";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }, [name]);

    return (
        <div className="w-9 h-9 bg-blue-300 text-white rounded-full flex justify-center items-center font-semibold shrink-0">
            {initials}
        </div>
    );
}

function Pagination({ data }) {
    if (data.total <= data.per_page) return null;

    return (
        <div className="flex items-center justify-between mt-10 px-2 py-4 border-t border-slate-200">
            {/* Info Kiri */}
            <div className="text-sm text-slate-500">
                Hal{" "}
                <span className="font-semibold text-slate-700">
                    {data.current_page}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-700">
                    {data.last_page}
                </span>
            </div>

            {/* Navigasi Kanan */}
            <div className="flex items-center gap-2">
                <PaginationButton url={data.prev_page_url}>←</PaginationButton>

                {/* Tombol Current Page: Kita paksa tanpa URL dan tambah prop active */}
                <PaginationButton active={true}>
                    {data.current_page}
                </PaginationButton>

                <PaginationButton url={data.next_page_url}>→</PaginationButton>
            </div>
        </div>
    );
}

function PaginationButton({ children, url, active = false }) {
    const baseClass =
        "min-w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all";

    // 1. Kondisi untuk Halaman Aktif (Halaman saat ini)
    if (active) {
        return (
            <span
                className={`${baseClass} bg-white text-slate-600 border-slate-300 cursor-default`}
            >
                {children}
            </span>
        );
    }

    // 2. Kondisi untuk Tombol yang Bisa Diklik
    if (url) {
        return (
            <Link
                href={url}
                className={`${baseClass} bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400`}
            >
                {children}
            </Link>
        );
    }

    // 3. Kondisi untuk Tombol Mati (Disabled)
    return (
        <span
            className={`${baseClass} border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50`}
        >
            {children}
        </span>
    );
}

export default function Index({ users }) {
    return (
        <>
            <Head title="Users Page" />
            <div className="flex flex-wrap max-w-7xl mx-auto">
                {/* Bagian Kiri: Form (Opsional) */}
                <div className="p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">
                        Create User
                    </h2>
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-center">
                        Form Input Here
                    </div>
                </div>

                {/* Bagian Kanan: Daftar User */}
                <div className="p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4 sticky top-0 py-3 border-b bg-white z-10 text-slate-800">
                        User List
                    </h2>

                    {users.data.length > 0 ? (
                        <ul className="space-y-3">
                            {users.data.map((user) => (
                                <li
                                    key={user.id}
                                    className="border-b border-slate-100 p-3 hover:bg-slate-50 transition-colors rounded-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar name={user.name} />
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold text-slate-900 truncate">
                                                {user.name}
                                            </span>
                                            <span className="text-slate-500 text-sm truncate">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 italic text-center py-10">
                            Belum ada data user.
                        </p>
                    )}

                    {/* Memanggil Pagination dengan data users */}
                    <Pagination data={users} />
                </div>
            </div>
        </>
    );
}
