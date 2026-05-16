import api from '../lib/axios'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const productService = {
  getAll: async () => {
    await delay(600)
    return api.get('/products')
  },
  getBySlug: async (slug) => {
    await delay(600)
    return api.get(`/products/${slug}`)
  },
  store: (data) => api.post('/products', data),
  update: (slug, data) => api.patch(`/products/${slug}`, data),
}

export default productService