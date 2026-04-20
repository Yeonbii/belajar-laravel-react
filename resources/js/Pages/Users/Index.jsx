export default function Index({ users }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 sticky top-0 py-3 -mt-3 border-b bg-white">User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="border-b-2 border-slate-300 p-2 mb-3">
            <div className="">{user.name}</div>
            <div className="text-slate-600 text-sm italic">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}