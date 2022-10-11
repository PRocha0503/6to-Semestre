import { ITag } from "types";
import client from "@services/http";
import { useQuery } from "react-query";

interface ITagResponse {
	tags: ITag[];
}

const fetchTags = async (id: string): Promise<ITagResponse> => {
	return (await client.get(`/tag/${id}`)).data;
};

export default function useTags(area: string) {
	return useQuery<ITagResponse, Error>(
		["get-tags", area],
		() => fetchTags(area),
		{
			retry: false,
			staleTime: 20000, // only eligible to refetch after 20 seconds
		}
	);
}
