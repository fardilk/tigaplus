import { Routes, Route } from 'react-router-dom'
import { OrderProvider } from '@/context/OrderContext'
import { Layout } from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import PackagesPage from '@/pages/PackagesPage'
import PreviewPage from '@/pages/PreviewPage'
import PreviewDetailPage from '@/pages/PreviewDetailPage'
import ContactPage from '@/pages/ContactPage'
import './App.css'

function App() {
  return (
    <OrderProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/preview/:id" element={<PreviewDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </OrderProvider>
  )
}

export default App