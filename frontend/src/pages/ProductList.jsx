import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import productService from "../services/productService"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    productService.getAll()
      .then((response) => {
        setProducts(response.data.data)
      })
      .catch((error) => {
        console.error("Gagal ambil data:", error)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Memuat produk...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-400 text-sm">Gagal memuat produk, coba lagi.</p>
    </div>
  )

  if (products.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Belum ada produk.</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Daftar Produk</h1>
        <Link
          to="/products/create"
          className="text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-400 mt-0.5">{product.formatted_price}</p>
            </div>
            <Link
              to={`/products/${product.slug}`}
              className="text-sm text-blue-500 hover:underline"
            >
              Lihat detail →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList