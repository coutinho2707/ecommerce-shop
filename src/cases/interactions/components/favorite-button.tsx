import { useInteractions } from '../hooks/use-interactions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function FavoriteButton({ productId }: { productId: string }) {
  const { isFavorite, addFavorite, removeFavorite, error } = useInteractions();
  const [isLoading, setIsLoading] = useState(false);
  const favorite = isFavorite(productId);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      if (favorite) {
        await removeFavorite(productId);
      } else {
        await addFavorite(productId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={handleToggle}
        disabled={isLoading}
        variant={favorite ? 'default' : 'outline'}
        className="rounded-full w-10 h-10 p-0"
      >
        <svg className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-gray-400'} fill-current`} viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
