import { ProductDetail } from "@/cases/products/components/product-detail";
import { useProduct } from "@/cases/products/hooks/use-product";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";

export function ProductDetailPage() {
    const {id} = useParams<{id: string}>();
    const {data: product, isLoading, isError} = useProduct(id!) 

    if (isLoading) {
        return <div className="p-4">Carregando...</div>;
    }

    if (isError || !product) {
        return <div className="p-4">Produto não encontrado.</div>;
    }

    return (
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href= {`/?categoryId/${product.category.id}`} >
                            {product.category.name}
                        
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {product.name}
                        
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                <ProductDetail product={product} />
            </div>
        </div>
    )
}