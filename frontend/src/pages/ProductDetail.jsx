import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import productService from "../services/productService"

function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    productService.getBySlug(slug)
      .then((response) => {
        setProduct(response.data.data)
      })
      .catch((error) => {
        console.error("Gagal ambil detail:", error)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

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

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Produk tidak ditemukan.</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6">
        ← Kembali
      </Link>

      <div className="border border-gray-100 rounded-xl px-6 py-5">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h1>
        <p className="text-2xl font-semibold text-blue-500 mt-3">{product.formatted_price}</p>
      </div>
    </div>
  )
}

export default ProductDetail