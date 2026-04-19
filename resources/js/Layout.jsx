export default function Layout({ children }) {
    return (
        <div>
            <nav>
                <h1 className="text-2xl font-semibold">My App Navbar</h1>
            </nav>

            <main>
                {children}
            </main>

            <footer className="font-semibold">Footer Website</footer>
        </div>
    );
}