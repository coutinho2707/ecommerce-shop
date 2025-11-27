import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProductDTO } from '../dtos/product.dto';
import { FormattedNumber } from 'react-intl';
import { ShoppingCart } from 'lucide-react';
import { FavoriteButton } from '@/cases/interactions/components/favorite-button';

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {

  // explicar essa validação no video pois é interessante
  let imagePath: string | null = null;

  const photoUrl = product.photos?.[0]?.url;

  if (typeof photoUrl === "string") {
    if (photoUrl.startsWith("http")) {
      imagePath = photoUrl;
    } else {
      const bucketBaseUrl = import.meta.env.VITE_BUCKET_URL;
      imagePath = bucketBaseUrl + photoUrl;
    }
  }

  // explicar os cálculos no video e a implementação dos descontos
  const discountPrice = product.price * 0.9;
  const installmentPrice = product.price / 10;

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      <CardHeader className="p-0 relative overflow-hidden bg-gray-100">
        <div className="relative w-full h-80 flex items-center justify-center">
          {imagePath ? (
            <img
              src={imagePath}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />) : null}
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -10%
          </div>
          <div className="absolute top-2 right-2">
            <FavoriteButton productId={product.id} />
          </div>
        </div>

      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-4 flex-1">
        {/* Título */}
        <div>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Preços */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 line-through">
            <FormattedNumber
              value={product.price}
              style="currency"
              currency="BRL"
            />
          </p>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">
                <FormattedNumber
                  value={discountPrice}
                  style="currency"
                  currency="BRL"
                />
              </span>
              <span className="text-xs text-gray-500">à vista PIX</span>
            </div>

            <p className="text-xs text-gray-600">
              ou 10x de{' '}
              <span className="font-semibold">
                <FormattedNumber
                  value={installmentPrice}
                  style="currency"
                  currency="BRL"
                />
              </span>
            </p>
          </div>
        </div>

        {/* Botão - sempre no final */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 mt-auto">
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Adicionar</span>
        </Button>
      </CardContent>
    </Card>
  );
}
