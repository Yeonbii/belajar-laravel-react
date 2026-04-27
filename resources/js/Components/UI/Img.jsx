import { useState } from "react";

export default function Img({ src, alt, className = "", fallback = null }) {
    const [error, setError] = useState(false);

    // Kalau gagal load dan ada fallback, tampilkan fallback
    if (error) {
        return fallback ?? (
            <div className={`bg-slate-100 flex items-center justify-center ${className}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 10.5h.008v.008H13.5V10.5z" />
                </svg>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"       // browser hanya load gambar kalau sudah mendekati layar
            decoding="async"     // decode gambar tidak memblokir render halaman
            onError={() => setError(true)}
        />
    );
}