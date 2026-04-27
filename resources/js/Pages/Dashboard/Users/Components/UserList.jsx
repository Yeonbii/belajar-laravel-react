import UserItem from "./UserItem";
import Pagination from "@/Components/UI/Pagination/Pagination";

export default function UserList({ items, pagination }) {
    const anchor = "user-list";

    return (
        <div
            id={anchor}
            className="w-full md:w-1/2 flex flex-col h-[calc(100vh-2rem)]"
        >
            {/* Header */}
            <div className="shrink-0">
                <h2 className="text-2xl font-bold py-3 border-b-2 border-primary-dark text-slate-800 bg-white">
                    User List
                </h2>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-4 pr-1">
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

            {/* Pagination */}
            <div className="shrink-0 pt-3 bg-white">
                <Pagination pagination={pagination} anchor={anchor} />
            </div>
        </div>
    );
}