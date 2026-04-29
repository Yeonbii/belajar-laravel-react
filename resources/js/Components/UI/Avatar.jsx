import { useMemo } from "react";
import Img from "./Img";

export default function Avatar({ name, avatarUrl = null }) {
    // ✅ Cek apakah URL external (Google)
    const avatarSrc = useMemo(() => {
        if (!avatarUrl) return null;

        // kalau sudah URL lengkap (http/https)
        if (avatarUrl.startsWith("http")) {
            return avatarUrl;
        }

        // kalau lokal (storage)
        return `/storage/${avatarUrl}`;
    }, [avatarUrl]);

    const initials = useMemo(() => {
        if (!name) return "";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    }, [name]);

    if (avatarSrc) {
        return (
            <Img
                src={avatarSrc}
                alt={name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
            />
        );
    }

    return (
        <div className="w-9 h-9 bg-primary-light text-white text-xs rounded-full flex justify-center items-center font-semibold shrink-0">
            {initials}
        </div>
    );
}