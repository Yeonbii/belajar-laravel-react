import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../services/productService";

function ProductDetailSkeleton() {
    return (
        <div className="animate-pulse border border-gray-100 rounded-xl px-6 py-5">
            <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
            <div className="h-7 w-32 bg-gray-100 rounded mt-3" />
        </div>
    );
}

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        productService
            .getBySlug(slug)
            .then(response => {
                setProduct(response.data.data);
            })
            .catch(error => {
                console.error("Gagal ambil detail:", error);
                setError("Gagal memuat produk, coba lagi.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Link
                to="/"
                className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6"
            >
                ← Kembali
            </Link>

            {loading && <ProductDetailSkeleton />}

            {error && (
                <p className="text-center text-red-400 text-sm">{error}</p>
            )}

            {!loading && !error && !product && (
                <p className="text-center text-gray-400 text-sm">
                    Produk tidak ditemukan.
                </p>
            )}

            {!loading && !error && product && (
                <div className="border border-gray-100 rounded-xl px-6 py-5">
                    <h1 className="text-xl font-semibold text-gray-800 mb-1">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-semibold text-blue-500 mt-3">
                        {product.formatted_price}
                    </p>

                    {/* Tambah ini */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                        <Link
                            to={`/products/${product.slug}/edit`}
                            className="text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Edit Produk
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
