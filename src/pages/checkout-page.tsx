import { CheckoutForm } from '../cases/orders/components/checkout-form';

export function CheckoutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        <p className="text-gray-600 mt-2">
          Revise seus itens e confirme o pedido
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}
