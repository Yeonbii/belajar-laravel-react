import UserItem from "./UserItem";
import Pagination from "@/Components/UI/Pagination/Pagination";

export default function UserList({ items, pagination }) {
    const anchor = "user-list";

    return (
        <div
            id={anchor}
            className="w-full md:w-1/2 md:h-screen md:flex md:flex-col"
        >
            <h2 className="text-2xl font-bold mb-4 py-3 border-b-2 border-primary-dark z-10 text-slate-800 sticky top-0 md:static">
                User List
            </h2>
            <div className="md:flex-auto md:overflow-y-auto">
                {items.length > 0 ? (
                    <ul className="space-y-3">
                        {items.map((item) => (
                            <UserItem key={item.id} item={item} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500 italic text-center py-10">
                        Belum ada data user.
                    </p>
                )}
            </div>

            <Pagination pagination={pagination} anchor={anchor} />
        </div>
    );
}