import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    title: (title) => `${title} - Belajar Laravel React`,
    strictMode: true,
    progress: {
        color: "oklch(70.4% 0.14 182.503)", // Warna primary di app.css
        includeCSS: true,
        showSpinner: true,
    },
})