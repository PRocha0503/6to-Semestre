import client from "@services/http";
import { useQuery } from "react-query";
import { IArea } from "types/area";

interface AreaResponse {
	areas: IArea[];
}

const fetchUserAvailableAreas = async (id: string): Promise<AreaResponse> => {
	return (await client.get(`/area/${id}`)).data;
};

export default function useUserAvailableAreas(id: string) {
	return useQuery<AreaResponse, Error>(["get-areas", id], () =>
		fetchUserAvailableAreas(id)
	);
}
