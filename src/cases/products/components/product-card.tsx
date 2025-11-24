import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber } from "react-intl";

type ProductCardProps = {
    product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Name</CardTitle>
            </CardHeader>
            <CardContent>
                <h4>{product.name}</h4>
                <div className="w-full flex flex-col">
                    <p>
                        <FormattedNumber
                            value={product.price * 1.15}
                            style="currency"
                            currency="BRL"
                        />
                    </p>

                    <p>
                        <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="BRL"
                        />
                        em 10x de
                        <FormattedNumber
                            value={product.price / 10}
                            style="currency"
                            currency="BRL"
                        />
                    </p>

                    <p>
                        ou
                        <FormattedNumber
                            value={product.price * 0.9}
                            style="currency"
                            currency="BRL"
                        />
                        no PIX
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
