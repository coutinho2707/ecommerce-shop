import { useEffect, useState } from 'react';
import { useInteractions } from '../hooks/use-interactions';
import { StarRating } from './star-rating';

export function ProductReviews({ productId }: { productId: string }) {
  const { fetchProductReviews, isLoading } = useInteractions();
  const [reviews, setReviews] = useState<any>(null);

  useEffect(() => {
    fetchProductReviews(productId).then(setReviews);
  }, [productId, fetchProductReviews]);

  if (isLoading) return <div className="animate-pulse">Carregando...</div>;
  if (!reviews?.reviews?.length) return <p>Sem avaliações</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b">
        <span className="text-4xl font-bold">{reviews.averageRating.toFixed(1)}</span>
        <div className="flex flex-col">
          <StarRating rating={reviews.averageRating} />
          <span className="text-sm text-gray-500">{reviews.totalReviews} avaliações</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.reviews.map((review: any) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">{review.customer.name}</p>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            {review.comment && <p className="text-gray-700 text-sm">{review.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
