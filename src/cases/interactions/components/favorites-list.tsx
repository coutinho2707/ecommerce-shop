import { useEffect } from 'react';
import { useInteractions } from '../hooks/use-interactions';
import { Button } from '@/components/ui/button';

export function FavoritesList() {
  const { favorites, isLoading, fetchFavorites, removeFavorite } = useInteractions();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (isLoading) return <div className="animate-pulse">Carregando...</div>;
  if (favorites.length === 0) return <p className="text-center py-12">Nenhum favorito</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav: any) => (
        <div key={fav.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 h-40"></div>
          <div className="p-4">
            <h3 className="font-semibold text-lg line-clamp-2">{fav.product.name}</h3>
            <p className="text-gray-500 text-sm">
              R$ {(Number(fav.product.price)).toFixed(2)}
            </p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2 w-full"
              onClick={() => removeFavorite(fav.productId)}
            >
              Remover
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
