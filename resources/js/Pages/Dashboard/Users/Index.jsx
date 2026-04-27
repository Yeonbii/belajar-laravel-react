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
                <div className="flex flex-wrap max-w-7xl mx-auto">
                    {/* Form */}
                    <UserForm />
                    {/* List */}
                    <UserList items={items} pagination={pagination} />
                </div>
            </DashboardLayout>
        </>
    );
}
