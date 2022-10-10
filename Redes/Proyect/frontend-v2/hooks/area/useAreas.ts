import client from "@services/http";
import { useQuery } from "react-query";
import { IArea } from "types/area";

interface AreaResponse {
	areas: IArea[];
}

const fetchAreas = async (): Promise<AreaResponse> => {
	return (await client.get("/area")).data;
};

export default function useAreas() {
	return useQuery<AreaResponse, Error>(["get-areas"], () => fetchAreas());
}
