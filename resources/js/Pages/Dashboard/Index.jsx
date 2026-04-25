import { Head, router, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index() {
    const { auth } = usePage().props;

    function handleLogout() {
        router.post("/logout");
    }

    return (
        <>
            <Head title="Dashboard" />
            <DashboardLayout>
                <h1>Hello, {auth.user.name} 👋</h1>
                <button
                    onClick={handleLogout}
                    className="text-white bg-primary border border-transparent hover:bg-primary-dark focus:outline-2 focus:outline-offset-2 focus:outline-primary-dark shadow-xs font-bold rounded-lg text-xs px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Logout
                </button>
            </DashboardLayout>
        </>
    );
}
