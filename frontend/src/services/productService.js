import api from '../lib/axios'

const productService = {
  getAll: () => api.get('/products'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  store: (data) => api.post('/products', data),
}

export default productService