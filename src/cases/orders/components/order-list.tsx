import { useEffect, useState } from 'react';
import { useOrders } from '../hooks/use-orders';
import { Button } from '@/components/ui/button';
import { ReviewForm } from '@/cases/interactions/components/review-form';

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const formatPrice = (price: number | undefined): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return 'R$ 0,00';
  }
  return `R$ ${(price / 100).toFixed(2)}`;
};

export function OrderList() {
  const { orders, isLoading, error, fetchOrders } = useOrders();
  const [expandedReviewItemId, setExpandedReviewItemId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <h3 className="text-sm font-medium text-red-800">{error}</h3>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum pedido ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Pedido #{order.id.slice(0, 8)}</h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>

          <div className="space-y-4 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between text-sm mb-2">
                  <span>{item.productName} x{item.quantity}</span>
                  <span>{formatPrice(item.total)}</span>
                </div>

                {order.status === 'delivered' && (
                  <div className="mt-2">
                    {expandedReviewItemId === item.id ? (
                      <ReviewForm
                        orderItemId={item.id}
                        productName={item.productName}
                        onSuccess={() => {
                          setExpandedReviewItemId(null);
                          fetchOrders();
                        }}
                      />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedReviewItemId(item.id)}
                        className="w-full"
                      >
                        Avaliar Produto
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <div className="font-semibold">
              Total: {formatPrice(order.totalPrice)}
            </div>
            <div className="flex gap-2">
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
