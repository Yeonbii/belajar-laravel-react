import { Head, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <DashboardLayout>
                <h1>Hello, {auth.user.name} 👋</h1>
            </DashboardLayout>
        </>
    );
}
