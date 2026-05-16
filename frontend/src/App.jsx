import { Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import ProductCreate from './pages/ProductCreate'
import ProductEdit from './pages/ProductEdit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/create" element={<ProductCreate />} />
      <Route path="/products/:slug/edit" element={<ProductEdit />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
    </Routes>
  )
}

export default App