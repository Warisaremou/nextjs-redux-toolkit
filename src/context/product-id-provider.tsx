"use client";

import React, { createContext } from "react";

// type ProductIdContextType = {
//     productId: string;
//     setProductId: React.Dispatch<React.SetStateAction<string>>;
// };

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
