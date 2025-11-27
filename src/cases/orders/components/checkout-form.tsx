import { useState } from 'react';
import { useCart } from '../../cart/hooks/use-cart';
import { useAuth } from '../../auth/hooks/use-auth';
import { useOrders } from '../hooks/use-orders';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100);
};

export function CheckoutForm() {
  const { cart, totalValue, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, isLoading, error } = useOrders();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (cart.length === 0) {
      setFormError('Seu carrinho está vazio');
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.id ?? '',
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData);
      setOrderCreated(true);
      clearCart();

      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar pedido';
      setFormError(message);
    }
  };

  if (orderCreated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-md bg-green-50 p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✓ Pedido Criado com Sucesso!
          </h3>
          <p className="text-green-700 mb-4">
            Seu pedido foi registrado. Você será redirecionado para a página de pedidos...
          </p>
          <Button onClick={() => navigate('/orders')}>
            Ir para Meus Pedidos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resumo do Carrinho */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Seu carrinho está vazio
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatPrice(item.price)} cada
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                )}

                {formError && (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <h3 className="text-sm font-medium text-red-800">
                      {formError}
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Resumo e Confirmar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg shadow p-6 sticky top-20">
            <h3 className="text-xl font-bold mb-6">Total</h3>

            {cart.length > 0 && (
              <>
                <div className="space-y-3 mb-6">
                   <div className="flex justify-between">
                     <span className="text-gray-600">Subtotal</span>
                     <span>{formatPrice(totalValue)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Frete</span>
                     <span>Grátis</span>
                   </div>
                   <div className="border-t pt-3 flex justify-between font-bold text-lg">
                     <span>Total</span>
                     <span>{formatPrice(totalValue)}</span>
                   </div>
                 </div>

                <div className="bg-blue-50 rounded p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Cliente:</strong> {user?.name || user?.email}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading || cart.length === 0}
                    className="w-full"
                  >
                    {isLoading ? 'Processando...' : 'Confirmar Compra'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/cart')}
                  >
                    Voltar ao Carrinho
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
