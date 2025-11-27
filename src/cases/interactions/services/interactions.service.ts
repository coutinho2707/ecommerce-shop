import { api } from '@/lib/axios';

const BASE_URL = '/interactions';

export class InteractionsService {
  private getHeaders(token: string) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // FAVORITOS
  async addFavorite(productId: string, token: string) {
    console.log('addFavorite - token:', token ? `${token.slice(0, 10)}...` : 'missing');
    return api.post(`${BASE_URL}/favorites/${productId}`, {}, {
      headers: this.getHeaders(token),
    });
  }

  async removeFavorite(productId: string, token: string) {
    return api.delete(`${BASE_URL}/favorites/${productId}`, {
      headers: this.getHeaders(token),
    });
  }

  async getFavorites(token: string) {
    console.log('getFavorites - token:', token ? `${token.slice(0, 10)}...` : 'missing');
    const res = await api.get(`${BASE_URL}/favorites`, {
      headers: this.getHeaders(token),
    });
    return res.data;
  }

  async isFavorite(productId: string, token: string) {
    const res = await api.get(`${BASE_URL}/favorites/check/${productId}`, {
      headers: this.getHeaders(token),
    });
    return res.data.isFavorite;
  }

  // REVIEWS
  async createReview(data: any, token: string) {
    const res = await api.post(`${BASE_URL}/reviews`, data, {
      headers: this.getHeaders(token),
    });
    return res.data;
  }

  async getProductReviews(productId: string) {
    const res = await api.get(`${BASE_URL}/reviews/product/${productId}`);
    return res.data;
  }

  async getMyReviews(token: string) {
    const res = await api.get(`${BASE_URL}/reviews/my`, {
      headers: this.getHeaders(token),
    });
    return res.data;
  }

  async deleteReview(reviewId: string, token: string) {
    return api.delete(`${BASE_URL}/reviews/${reviewId}`, {
      headers: this.getHeaders(token),
    });
  }
}
