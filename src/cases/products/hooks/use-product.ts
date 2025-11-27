import { useQuery } from "@tanstack/react-query";
import type { ProductDTO } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";


export function useProducts(categoryId: string | undefined) {
    return useQuery<ProductDTO[]>({
        queryKey: ['products', categoryId ?? 'all'],
        queryFn: () => ProductService.list(categoryId)
    });
}

export function useProductSearch(query: string) {
    return useQuery<ProductDTO[]>({
        queryKey: ['products', 'search', query],
        queryFn: () => ProductService.search(query),
        enabled: query.length >= 2
    });
}

export function useProduct(id: string) {
    return useQuery<ProductDTO>({
        queryKey: ['product', id],
        queryFn: () => ProductService.getById(id),
        enabled: !!id //-> or Boolean(id)
    });
}