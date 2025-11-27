import { useCart } from "../hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartContent() {
    const { cart, removeFromCart, updateQuantity, totalValue, clearCart } = useCart();
    const navigate = useNavigate();
    const bucketsUrl = import.meta.env.VITE_BUCKETS_URL;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => {
                     const mainPhoto = item.photos?.[0];
                     const imageUrl = mainPhoto 
                         ? `${bucketsUrl}${mainPhoto.path}` 
                         : `https://placehold.co/100x100?text=Sem+Imagem`;

                    return (
                        <Card key={item.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden border">
                                <img 
                                    src={imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex-1 space-y-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {formatPrice(item.price)} unit.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="icon-sm"
                                        onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                                    >
                                        -
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button 
                                        variant="outline" 
                                        size="icon-sm"
                                        onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => removeFromCart(item.id!)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
                
                <div className="flex justify-end">
                    <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
                        Limpar Carrinho
                    </Button>
                </div>
            </div>

            <div className="lg:col-span-1">
                <Card className="p-6 sticky top-4">
                    <h3 className="font-semibold text-lg mb-4">Resumo do Pedido</h3>
                    
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatPrice(totalValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Frete</span>
                            <span className="text-green-600 font-medium">Grátis</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{formatPrice(totalValue)}</span>
                        </div>
                    </div>

                    <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => navigate('/checkout')}
                    >
                        Finalizar Compra
                    </Button>
                </Card>
            </div>
        </div>
    );
}
