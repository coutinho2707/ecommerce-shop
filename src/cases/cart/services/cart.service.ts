import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface CartItem extends ProductDTO {
    quantity: number;
}

const CART_KEY = 'ecommerce-cart';

export const CartService = {
    getCart(): CartItem[] {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    addToCart(product: ProductDTO) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },

    removeFromCart(productId: string) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },

    updateQuantity(productId: string, quantity: number) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
    },

    clearCart() {
        localStorage.removeItem(CART_KEY);
    }
};
