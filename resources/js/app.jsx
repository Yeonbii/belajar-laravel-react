import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createInertiaApp({
    title: (title) => `${title} - Belajar Laravel React`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`]();
    },
    progress: {
        // Gunakan kode HEX agar warna muncul
        color: "#7c3aed",

        // Kalau mau pakai default, cukup biarkan includeCSS: true
        includeCSS: true,
        showSpinner: true, // Bagus untuk tampilan yang lebih "clean"
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
});
