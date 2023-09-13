// import { Product } from "./cart-slice";
import { ProductType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Here I want to define products state type and initial state

export interface Product {
    productDetails: ProductType;
    quantity: number;
}

export interface CartState {
    cart: Product[];
}

const initialState: CartState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // For add to cart reducer add optional payload for quantity if quantity is not pass use 1 as default else use payload quantity
        addToCart: (state, action: PayloadAction<{ product: ProductType; quantity?: number }>) => {
            const { product, quantity } = action.payload;
            const existingProduct = state.cart.find((item) => item.productDetails.id === product.id);
            if (existingProduct) {
                if (quantity) existingProduct.quantity += quantity;
                else existingProduct.quantity++;
            } else {
                if (quantity) state.cart.push({ productDetails: product, quantity });
                else state.cart.push({ productDetails: product, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<ProductType>) => {
            const existingProduct = state.cart.find((product) => product.productDetails.id === action.payload.id);
            if (existingProduct && existingProduct.quantity === 1) {
                state.cart = state.cart.filter((product) => product.productDetails.id !== action.payload.id);
            } else if (existingProduct) {
                existingProduct.quantity--;
            }
        },
        clearFromCart: (state, action: PayloadAction<ProductType>) => {
            state.cart = state.cart.filter((product) => product.productDetails.id !== action.payload.id);
        },

        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, clearFromCart } = cartSlice.actions;
export default cartSlice.reducer;
