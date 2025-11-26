import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'
import { CartProvider } from './cases/cart/contexts/card-contexts.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="pt-BR" messages={{}}>
        <CartProvider>
          <App />
        </CartProvider>
      </IntlProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
