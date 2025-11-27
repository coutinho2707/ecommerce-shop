import { OrderList } from '../cases/orders/components/order-list';

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <p className="text-gray-600 mt-2">Acompanhe e gerencie seus pedidos</p>
      </div>

      <OrderList />
    </div>
  );
}
