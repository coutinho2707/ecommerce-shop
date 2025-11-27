import { useState, useCallback } from 'react';
import { OrderService } from '../services/order.service';
import type { Order, CreateOrderDto } from '../dtos/order.dto.tsx';
import { useAuth } from '../../auth/hooks/use-auth';

const orderService = new OrderService();

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('auth_token') || '';

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await orderService.getOrders(token);
      setOrders(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar pedidos';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  const createOrder = useCallback(
    async (data: CreateOrderDto) => {
      setIsLoading(true);
      setError(null);

      try {
        const newOrder = await orderService.createOrder(data, token);
        setOrders((prev) => [...prev, newOrder]);
        return newOrder;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Falha ao criar pedido';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const cancelOrder = useCallback(
    async (orderId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await orderService.cancelOrder(orderId, token);
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: 'cancelled' } : order
          )
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Falha ao cancelar pedido';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const deliverOrder = useCallback(
    async (orderId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedOrder = await orderService.deliverOrder(orderId, token);
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? updatedOrder : order
          )
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Falha ao marcar como entregue';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    createOrder,
    cancelOrder,
    deliverOrder,
  };
}
