import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    strictMode: true,
    progress: {
        color: "oklch(70.4% 0.14 182.503)", // Warna primary di app.css
        includeCSS: true,
        showSpinner: true,
    },
})