import { useState } from "react";
import type { ProductDTO } from "../dtos/product.dto";
import { Button } from "@/components/ui/button";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { FavoriteButton } from "@/cases/interactions/components/favorite-button";
import { ProductReviews } from "@/cases/interactions/components/product-reviews";

type ProductDetailProps = {
    product: ProductDTO;
};

export function ProductDetail({
    product
}: ProductDetailProps) {

    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
    const { addToCart } = useCart();
    
    const photos = product.photos || [];
    const mainPhoto = photos[selectedPhoto];
    
    // A URL já vem construída do backend
    const mainImagePhoto = mainPhoto?.url || `https://placehold.co/500x500?text=Sem+Imagem&font=roboto`;

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: show toast
        // alert("Produto adicionado ao carrinho com sucesso!");
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="flex flex-col gap-4">

            <div className="flex mt-8 gap-16 flex-col md:flex-row">
                <div className="min-w-md flex flex-col gap-4">
                    {/* Imagem Principal */}
                    <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                        src={mainImagePhoto} 
                        alt={product.name} 
                        className="w-full h-96 object-contain" />
                    </div>
                    
                    {/* Galeria de Thumbnails */}
                    {photos.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {photos.map((photo, index) => (
                                <button
                                    key={photo.id}
                                    onClick={() => setSelectedPhoto(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedPhoto === index 
                                            ? 'border-blue-500' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <img 
                                        src={photo.url} 
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col gap-6">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <div className="text-sm text-muted-foreground mb-4">
                                    {product.category.name} {product.brand ? `• ${product.brand.name}` : ''}
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                    {formatPrice(product.price)}
                                </div>
                            </div>
                            <FavoriteButton productId={product.id} />
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description || "Sem descrição disponível."}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
                            Adicionar ao Carrinho
                        </Button>
                    </div>
                </div>

            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Avaliações</h2>
                <ProductReviews productId={product.id} />
            </div>

        </div>
    )
}