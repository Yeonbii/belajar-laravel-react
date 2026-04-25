import { Head } from "@inertiajs/react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function Index({ users }) {
    // ✅ Data shaping (inti dari perbaikan)
    const items = users.data;
    const pagination = users;

    return (
        <>
            <Head title="Users Page" />

            <div className="flex flex-wrap max-w-7xl mx-auto">
                {/* Form */}
                <UserForm />
                {/* List */}
                <UserList items={items} pagination={pagination} />
            </div>
        </>
    );
}
