import Avatar from "@/Components/ui/Avatar";

export default function UserItem({ item }) {
    // Kalau ada avatar, buat URL lengkapnya
    // "/storage/avatars/namafile.jpg"
    const avatarUrl = item.avatar ? `/storage/${item.avatar}` : null;

    return (
        <li className="border-b border-slate-100 p-3 hover:bg-slate-50 transition-colors rounded-lg">
            <div className="flex items-center gap-4">
                <Avatar name={item.name} src={avatarUrl} />
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-900 truncate">
                        {item.name}
                    </span>
                    <span className="text-slate-500 text-sm truncate">
                        {item.email}
                    </span>
                </div>
            </div>
        </li>
    );
}