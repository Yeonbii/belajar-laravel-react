import { Head } from "@inertiajs/react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index({ users }) {
    // ✅ Data shaping (inti dari perbaikan)
    const items = users.data;
    const pagination = users;

    return (
        <>
            <Head title="Users Page" />

            <DashboardLayout>
                <div className="flex flex-wrap w-full max-w-7xl mx-auto gap-4">
                    {/* Form */}
                    <UserForm />
                    {/* List */}
                    <UserList items={items} pagination={pagination} />
                </div>
            </DashboardLayout>
        </>
    );
}
