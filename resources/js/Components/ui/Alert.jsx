import { useState, useCallback, useEffect } from "react";

export default function Alert({ type, message, submitCount }) {
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