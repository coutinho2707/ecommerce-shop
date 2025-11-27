import { useState, useCallback, useEffect } from 'react';
import { InteractionsService } from '../services/interactions.service';
import { useAuth } from '../../auth/hooks/use-auth';
import { AuthService } from '../../auth/services/auth.service';

const service = new InteractionsService();
const authService = new AuthService();

export function useInteractions() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    const token = authService.getToken() || '';
    console.log('getToken() called:', token ? `${token.slice(0, 10)}...` : 'EMPTY');
    return token;
  };

  // FAVORITOS
  const fetchFavorites = useCallback(async () => {
    console.log('fetchFavorites called, user:', user?.email);
    const token = getToken();
    console.log('fetchFavorites - token:', token ? `${token.slice(0,10)}...` : 'MISSING', 'user:', user?.email);
    if (!user || !token) {
      console.log('fetchFavorites - skipping: user or token missing');
      return;
    }
    setIsLoading(true);
    try {
      console.log('calling getFavorites with token');
      const data = await service.getFavorites(token);
      setFavorites(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro';
      console.error('fetchFavorites error:', msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Carregar favoritos ao montar
  useEffect(() => {
    const token = getToken();
    if (user && token) {
      fetchFavorites();
    }
  }, [user, fetchFavorites]);

  const addFavorite = useCallback(
    async (productId: string) => {
      const token = getToken();
      try {
        const res = await service.addFavorite(productId, token);
        const favoriteData = res.data || res;
        setFavorites((prev) => [...prev, favoriteData]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
        throw err;
      }
    },
    [user]
  );

  const removeFavorite = useCallback(
    async (productId: string) => {
      const token = getToken();
      try {
        await service.removeFavorite(productId, token);
        setFavorites((prev) => prev.filter((f) => f.productId !== productId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
      }
    },
    [user]
  );

  const isFavorite = (productId: string) => 
    favorites.some((f) => f.productId === productId);

  // REVIEWS
  const fetchProductReviews = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      return await service.getProductReviews(productId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyReviews = useCallback(async () => {
    const token = getToken();
    if (!user || !token) return;
    setIsLoading(true);
    try {
      const data = await service.getMyReviews(token);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createReview = useCallback(
    async (reviewData: any) => {
      const token = getToken();
      try {
        const review = await service.createReview(reviewData, token);
        setReviews((prev) => [review, ...prev]);
        return review;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
        throw err;
      }
    },
    [user]
  );

  const deleteReview = useCallback(
    async (reviewId: string) => {
      const token = getToken();
      try {
        await service.deleteReview(reviewId, token);
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
      }
    },
    [user]
  );

  return {
    favorites,
    reviews,
    isLoading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    fetchProductReviews,
    fetchMyReviews,
    createReview,
    deleteReview,
  };
}
