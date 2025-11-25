import { Routes, Route } from 'react-router-dom';
import { ProdutcListPage } from './pages/product-list.page';
import { ProductDetailPage } from './pages/product-detail.page';

function App() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <header className="bg-white shadow-sm">
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/*" element={<ProdutcListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
