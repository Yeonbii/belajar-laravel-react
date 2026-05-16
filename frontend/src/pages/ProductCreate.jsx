import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import productService from "../services/productService"

function ProductCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", price: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      await productService.store(form)
      navigate("/")
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors)
      } else {
        alert("Terjadi kesalahan, coba lagi!")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6">
        ← Kembali
      </Link>

      <h1 className="text-xl font-semibold text-gray-800 mb-6">Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Nama produk</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="contoh: Kaos Polos Putih"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">Harga</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="contoh: 85000"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  )
}

export default ProductCreate