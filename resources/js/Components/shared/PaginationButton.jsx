import { Link } from "@inertiajs/react";

export default function PaginationButton({ children, url, active = false }) {
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