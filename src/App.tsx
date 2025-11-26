import { Routes, Route } from 'react-router-dom';
import { ProdutcListPage } from './pages/product-list.page';
import { ProductDetailPage } from './pages/product-detail.page';
import { CartPage } from './pages/cart-page';
import { Header } from './components/layout/header';

function App() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<ProdutcListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
