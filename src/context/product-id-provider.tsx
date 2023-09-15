"use client";

import React, { createContext } from "react";

const ProductIdContext = createContext({
    productId: "",
    setProductId: (value: string) => {},
});

export const ProductIdContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [productId, setProductId] = React.useState<string>("");

    return (
        <ProductIdContext.Provider
            value={{
                productId,
                setProductId,
            }}
        >
            {children}
        </ProductIdContext.Provider>
    );
};

export const useProductIdProvider = () => {
    return React.useContext(ProductIdContext);
};
