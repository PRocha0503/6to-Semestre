import { IUser } from "../../types/user";
// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface AuthRequest {
	areaName: string;
	name: string;
	color: string;
	icon: string;
}

const addTag = async ({
	areaName,
	name,
	color,
	icon,
}: AuthRequest): Promise<IUser> => {
	return (
		await client.post(`/tag/${areaName}`, {
			name,
			color,
			icon,
		})
	).data;
};

export default function useAddTag(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<IUser, Error>(() => addTag(req), {
		onSuccess: () => {
			queryClient.invalidateQueries(["query-profile"]);
		},
	});
}
