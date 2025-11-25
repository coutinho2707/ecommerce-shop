import { useState } from "react";
import type { ProductDTO } from "../dtos/product.dto";

type ProductDetailProps = {
    product: ProductDTO;
};

export function ProductDetail({
    product
}: ProductDetailProps) {

    const bucketsUrl = import.meta.env.VITE_BUCKETS_URL;
    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
    const photos = product.photos || [];
    const mainPhoto = photos[selectedPhoto];
    const mainImagePhoto= mainPhoto 
        ? `${bucketsUrl}${mainPhoto.path}` 
        : `https://placehold.co/300x300?text=Sem+Imagem&font-roboto`;

    return (
        <div className="flex flex-col gap-4">

            <div className="flex mt-8 gap-16">
                <div className="min-w-md">
                    <div className="w-full">
                        <img 
                        src ={mainImagePhoto} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain" />
                    </div>
                    
                </div>

                <div className="w-fit">

                </div>

            </div>


        </div>
    )
}