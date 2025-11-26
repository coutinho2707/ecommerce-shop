import { CartContent } from "@/cases/cart/components/cart-content";
import { CartEmpty } from "@/cases/cart/components/cart-empty";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function CartPage() {
    const { cart } = useCart();

    return (
        <div className="p-4">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Carrinho</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

            {cart.length > 0 ? <CartContent /> : <CartEmpty />}
        </div>
    );
}
