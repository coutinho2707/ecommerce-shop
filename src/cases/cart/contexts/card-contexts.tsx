import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CartService } from "../services/cart.service";
import type { CartItem } from "../services/cart.service";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: ProductDTO) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalValue: number;
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(CartService.getCart());
    }, []);

    const addToCart = (product: ProductDTO) => {
        CartService.addToCart(product);
        setCart(CartService.getCart());
    };

    const removeFromCart = (productId: string) => {
        CartService.removeFromCart(productId);
        setCart(CartService.getCart());
    };

    const updateQuantity = (productId: string, quantity: number) => {
        CartService.updateQuantity(productId, quantity);
        setCart(CartService.getCart());
    };

    const clearCart = () => {
        CartService.clearCart();
        setCart([]);
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalValue
        }}>
            {children}
        </CartContext.Provider>
    );
}
