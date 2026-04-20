import { useForm, InfiniteScroll, router } from '@inertiajs/react'
import { useEffect } from 'react'

export default function ListScroll({ users, filters }) {
  // 🔹 FORM CREATE
  const form = useForm({
    name: '',
    email: '',
    password: '',
  })

  // 🔹 SEARCH
  const search = useForm({
    search: filters.search || '',
  })

  // 🔁 HANDLE SEARCH (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/users/list-scroll', {
        search: search.data.search,
      }, {
        preserveState: true,
        replace: true,
      })
    }, 300)

    return () => clearTimeout(delay)
  }, [search.data.search])

  // 🔁 SUBMIT CREATE
  function submit(e) {
    e.preventDefault()

    form.post('/users', {
      preserveScroll: true,
      onSuccess: () => form.reset(),
    })
  }

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* 🔥 FORM CREATE */}
      <form onSubmit={submit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={form.data.name}
          onChange={e => form.setData('name', e.target.value)}
          className="border p-2 w-full"
        />
        {form.errors.name && <div className="text-red-500 text-sm">{form.errors.name}</div>}

        <input
          type="email"
          placeholder="Email"
          value={form.data.email}
          onChange={e => form.setData('email', e.target.value)}
          className="border p-2 w-full"
        />
        {form.errors.email && <div className="text-red-500 text-sm">{form.errors.email}</div>}

        <input
          type="password"
          placeholder="Password"
          value={form.data.password}
          onChange={e => form.setData('password', e.target.value)}
          className="border p-2 w-full"
        />
        {form.errors.password && <div className="text-red-500 text-sm">{form.errors.password}</div>}

        <button
          type="submit"
          disabled={form.processing}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {form.processing ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search user..."
        value={search.data.search}
        onChange={e => search.setData('search', e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* 📋 LIST + INFINITE SCROLL */}
      <InfiniteScroll
        data="users"
        only-next
        buffer={200}
        loadingComponent={
          <div className="text-center py-4 text-gray-500">
            Loading...
          </div>
        }
      >
        {users.data.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.data.map(user => (
              <li key={user.id} className="border p-2 rounded">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </li>
            ))}
          </ul>
        )}
      </InfiniteScroll>
    </div>
  )
}