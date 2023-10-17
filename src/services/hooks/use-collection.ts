import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollection = (collectionId?: string) => {
	return useQuery({
		queryKey: ["collection", { collectionId }],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://mock.shop/api?query={collection(id:%20%22${collectionId}%22){id%20handle%20title%20description%20image%20{id%20url}%20products(first:%2020){edges%20{node%20{id%20title%20featuredImage%20{id%20url}}}}}}`
			);
			return { data: data.data };
		},
	});
};
