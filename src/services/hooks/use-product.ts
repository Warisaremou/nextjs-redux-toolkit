import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProduct = (productId?: string) => {
    return useQuery({
        queryKey: ["product", { productId }],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://mock.shop/api?query={product(id:%20%22${productId}%22){id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{cursor%20node%20{id%20title%20image%20{url}%20price%20{amount%20currencyCode}}}}}}`
            );
            return { data: data.data };
        },
    });
};

// productId ==> gid://shopify/Product/7982905098262
