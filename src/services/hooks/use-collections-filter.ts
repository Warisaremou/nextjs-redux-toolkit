import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollectionsFilters = () => {
	return useQuery({
		queryKey: ["collections-filters"],
		queryFn: async () => {
			const { data } = await axios.get(
				"https://mock.shop/api?query={collections(first:%2010){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}"
			);
			return { data: data.data.collections.edges };
		},
	});
};
