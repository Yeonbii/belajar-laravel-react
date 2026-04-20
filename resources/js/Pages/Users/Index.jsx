import { useForm, router } from '@inertiajs/react'
import { useEffect } from 'react'

export default function Index({ users, filters }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    password: '',
  })
  
  const search = useForm({
    search: filters.search || '',
  })
  
  function submit(e) {
    e.preventDefault()

    post('/users', {
      onSuccess: () => reset(),
    })
  }
  
  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/users', {
        search: search.data.search,
      }, {
        preserveState: true,
        replace: true,
      })
    }, 300)

    return () => clearTimeout(delay)
  }, [search.data.search])

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* FORM */}
      <form onSubmit={submit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData('password', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {processing ? 'Creating...' : 'Create User'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search user..."
        value={search.data.search}
        onChange={e => search.setData('search', e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* LIST USER */}
      <div>
        <h2 className="font-bold mb-2">User List</h2>

        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="border p-2 rounded">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}