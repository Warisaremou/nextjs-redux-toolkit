import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios.get(
                "https://mock.shop/api?query={products(first:%208){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}"
            );
            return { data: data.data.products.edges };
        },
    });
};
