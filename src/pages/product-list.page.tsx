import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link } from "react-router-dom";

export function ProdutcListPage() {
    const { data: products } = useProducts();

    return (
        <>
            <CategoryMenu
            />
            <section className="flex flex-col">
                <div className="flex mt-8 gap-8">
                    {products && products.map(product => (
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                        
                    ))}

                </div>
            </section>
        </>
    )
}
