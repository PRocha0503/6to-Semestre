import { IUser } from "../../types/user";
// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface AuthRequest {
	areaName: string;
	tagId: string;
}

const deleteTag = async ({ areaName, tagId }: AuthRequest): Promise<IUser> => {
	return (await client.delete(`/tag/${areaName}/${tagId}`)).data;
};

export default function useDeleteTag(req: AuthRequest) {
	const queryClient = useQueryClient();
	return useMutation<IUser, Error>(() => deleteTag(req), {
		onSuccess: () => {
			queryClient.invalidateQueries(["query-profile"]);
		},
	});
}
