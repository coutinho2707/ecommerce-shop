import { CategoryMenu } from '@/cases/categories/components/category-menu';
import { ProductCard } from '@/cases/products/components/product-card';
import { useProducts } from '@/cases/products/hooks/use-product';
import { Link, useSearchParams } from 'react-router-dom';

export function ProdutcListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') || undefined;

  const { data: products } = useProducts(categoryId);

  return (
    <>
      <CategoryMenu />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {categoryId ? 'Produtos da Categoria' : 'Todos os Produtos'}
          </h2>
          <p className="text-gray-600 mt-2">
            {products?.length || 0} produto{products?.length !== 1 ? 's' : ''} encontrado
            {products?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="transition-transform hover:translate-y-2"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente selecionar outra categoria ou voltar mais tarde
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
