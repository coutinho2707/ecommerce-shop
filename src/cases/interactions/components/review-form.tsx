import { useState } from 'react';
import { useInteractions } from '../hooks/use-interactions';
import { StarRating } from './star-rating';
import { Button } from '@/components/ui/button';

export function ReviewForm({ orderItemId, productName, onSuccess }: any) {
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createReview, error } = useInteractions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReview({ orderItemId, rating });
      setRating(5);
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold">Avaliar: {productName}</h3>

      <div>
        <label className="block text-sm font-medium mb-2">Classificação</label>
        <StarRating rating={rating} onChange={setRating} readOnly={false} />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
