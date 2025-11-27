import { Routes, Route } from 'react-router-dom';
import { ProdutcListPage } from './pages/product-list.page';
import { ProductDetailPage } from './pages/product-detail.page';
import { CartPage } from './pages/cart-page';
import { SignInPage } from './pages/singin-pages';
import { SignUpPage } from './pages/singup-form';
import { OrdersPage } from './pages/orders-page';
import { FavoritesPage } from './pages/favorites-page';
import { CheckoutPage } from './pages/checkout-page';
import { Header } from './components/layout/header';
import { AuthProvider } from './cases/auth/contexts/auth.context';
import { ProtectedRoute } from './components/auth/protected-route';

function App() {
  return (
    <AuthProvider>
      <div className="bg-zinc-50 min-h-screen">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<ProdutcListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } 
            />
            </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
