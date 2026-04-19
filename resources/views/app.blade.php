<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh
        {{-- @vite('resources/js/app.jsx') --}}
        {{-- Dengan Tailwind --}}
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        {{-- <x-inertia::head /> --}}
        @inertiaHead
    </head>
    <body>
        {{-- <x-inertia::app /> --}}
        @inertia
    </body>
</html>