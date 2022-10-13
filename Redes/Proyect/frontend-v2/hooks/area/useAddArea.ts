// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";
import { ITag } from "types";

interface AuthRequest {
	name: string;
}

interface AddUserResponse {
	area: {
		name: string;
		tags: ITag[];
		_id: string;
	};
}

const addArea = async ({ name }: AuthRequest): Promise<AddUserResponse> => {
	return (await client.post(`/area`, { name })).data;
};

export default function useAddArea(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<AddUserResponse, Error>(() => addArea(req), {
		onSuccess: () => {
			queryClient.invalidateQueries(["get-areas"]);
		},
	});
}
