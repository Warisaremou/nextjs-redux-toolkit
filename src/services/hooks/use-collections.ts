import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollections = () => {
	return useQuery({
		queryKey: ["collections"],
		queryFn: async () => {
			const { data } = await axios.get(
				"https://mock.shop/api?query={collections(first:%203){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}"
			);
			return { data: data.data.collections.edges };
		},
	});
};
