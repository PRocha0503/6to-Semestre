import client from "@services/http";
import { useQuery } from "react-query";
import { IArea } from "types/area";

interface AreaResponse {
	areas: IArea[];
}

const fetchUserAvailableAreas = async (
	userId: string
): Promise<AreaResponse> => {
	return (await client.get(`/area/${userId}`)).data;
};

export default function useUserAvailableAreas(userId: string) {
	return useQuery<AreaResponse, Error>(["get-user-areas"], () =>
		fetchUserAvailableAreas(userId)
	);
}
