import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

createInertiaApp({
    title: (title) => `${title} - Belajar Laravel React`, // Contoh
    resolve: name => {
        // Ini cara standar Inertia v3 untuk asinkronus (Code Splitting)
        const pages = import.meta.glob('./Pages/**/*.jsx')
        return pages[`./Pages/${name}.jsx`]()
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <App {...props} />
            </StrictMode>
        )
    },
})