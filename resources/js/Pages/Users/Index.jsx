import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState, useCallback, useEffect } from "react";

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
        <div className="w-9 h-9 bg-violet-300 text-white text-xs rounded-full flex justify-center items-center font-semibold shrink-0">
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
        <div className="flex items-center justify-between px-2 py-4 border-t-2 border-slate-200">
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

function InputField({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
}) {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2.5 text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`border-2 bg-slate-50 text-sm rounded block w-full px-3 py-2.5 shadow-xs focus:outline-violet-500 ${
                    error ? "border-red-400" : "border-slate-300"
                }`}
                placeholder={placeholder}
                // ← tidak pakai required di sini, validasi sepenuhnya dari Laravel
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
}

function PasswordField({
    label,
    id,
    placeholder,
    value,
    onChange,
    error,
    required = false,
}) {
    const [show, setShow] = useState(false);
    const toggle = useCallback(() => setShow((prev) => !prev), []);

    return (
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2.5 text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-2 bg-slate-50 text-sm rounded block w-full px-3 py-2.5 pr-10 shadow-xs focus:outline-violet-500 ${
                        error ? "border-red-400" : "border-slate-300"
                    }`}
                    placeholder={placeholder}
                    // ← tidak pakai required di sini
                />
                <button
                    type="button"
                    onClick={toggle}
                    tabIndex={-1} // ← tambah ini
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                        show ? "Sembunyikan password" : "Tampilkan password"
                    }
                >
                    {show ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    )}
                </button>
            </div>
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
}

function Alert({ type, message, submitCount }) {
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const close = useCallback(() => {
        setLeaving(true);
        setTimeout(() => {
            setVisible(false);
            setLeaving(false);
        }, 300);
    }, []);

    // submitCount sebagai sinyal — setiap angkanya berubah, alert tampil ulang
    useEffect(() => {
        if (!message || submitCount === 0) return;

        setLeaving(false);
        setVisible(true);

        const timer = setTimeout(() => close(), 4000);
        return () => clearTimeout(timer);
    }, [submitCount]); // ← sengaja hanya submitCount, bukan message

    if (!visible || !message) return null;

    const styles = {
        success: "bg-green-50 border-green-400 text-green-700",
        error: "bg-red-50 border-red-400 text-red-700",
    };

    return (
        <div
            className={`flex items-center justify-between gap-2 border-l-4 px-4 py-3 rounded-r-lg text-sm mb-5 transition-opacity duration-300 ${styles[type]} ${leaving ? "opacity-0" : "opacity-100"}`}
        >
            <div className="flex items-center gap-2">
                <span className="font-bold">
                    {type === "success" ? "✓" : "✕"}
                </span>
                <span>{message}</span>
            </div>
            <button
                type="button"
                onClick={close}
                tabIndex={-1}
                className="ml-2 text-current opacity-50 hover:opacity-100 font-bold text-base leading-none"
                aria-label="Tutup notifikasi"
            >
                ×
            </button>
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
        <div
            id={anchor}
            className="p-6 w-full md:w-1/2 md:h-screen md:flex md:flex-col"
        >
            <h2 className="text-2xl font-bold mb-4 py-3 border-b-2 border-violet-600 bg-white z-10 text-slate-800 sticky top-0 md:static">
                User List
            </h2>
            <div className="md:flex-auto md:overflow-y-auto">
                {items.length > 0 ? (
                    <ul className="space-y-3">
                        {items.map((item) => (
                            <UserItem key={item.id} item={item} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500 italic text-center py-10">
                        Belum ada data user.
                    </p>
                )}
            </div>

            <Pagination pagination={pagination} anchor={anchor} />
        </div>
    );
}

function UserForm() {
    const { flash } = usePage().props;
    const [submitCount, setSubmitCount] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const errorMessage =
        Object.keys(errors).length > 0
            ? "Ada inputan wajib yang belum diisi atau tidak valid."
            : null;

    function handleSubmit(e) {
        e.preventDefault();
        post("/users", {
            onSuccess: () => reset(),
            // Naikkan counter setiap kali ada response dari server,
            // baik sukses maupun error — supaya alert selalu muncul ulang
            onFinish: () => setSubmitCount((c) => c + 1),
        });
    }

    return (
        <div className="p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Create User
            </h2>

            <Alert
                type="success"
                message={flash.success}
                submitCount={submitCount}
            />
            <Alert
                type="error"
                message={errorMessage}
                submitCount={submitCount}
            />

            <div className="p-4 border-2 border-slate-200 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        id="name"
                        placeholder="Your Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        required
                    />
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        required
                    />
                    <PasswordField
                        label="Password"
                        id="password"
                        placeholder="Min. 8 karakter"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        required
                    />
                    <PasswordField
                        label="Confirm Password"
                        id="password_confirmation"
                        placeholder="Ulangi password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white bg-violet-500 border border-transparent hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-600 shadow-xs font-bold rounded-lg text-xs px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </form>
            </div>
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
                <UserForm />
                {/* List */}
                <UserList items={items} pagination={pagination} />
            </div>
        </>
    );
}
