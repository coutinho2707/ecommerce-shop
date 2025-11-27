import type { Order, CreateOrderDto } from '../dtos/order.dto.tsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class OrderService {
  async getOrders(token: string): Promise<Order[]> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  }

  async getOrder(id: string, token: string): Promise<Order> {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  }

  async createOrder(data: CreateOrderDto, token: string): Promise<Order> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  }

  async cancelOrder(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/orders/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel order');
    }
  }

  async deliverOrder(id: string, token: string): Promise<Order> {
    const response = await fetch(`${API_URL}/orders/${id}/deliver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to deliver order');
    }

    return response.json();
  }
}
