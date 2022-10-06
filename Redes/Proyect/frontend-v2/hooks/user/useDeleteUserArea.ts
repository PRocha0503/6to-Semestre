import { IUser } from "./../../types/user";
// import { IDocument } from "types";
import client from "@services/http";
import { useMutation } from "react-query";

interface AuthRequest {
	areaId: string;
	userId: string;
}

interface AddUserResponse {
	_id: string;
	username: string;
	areas: string[];
	isAdmin: boolean;
}

const deleteUserArea = async ({
	areaId,
	userId,
}: AuthRequest): Promise<AddUserResponse> => {
	return (
		await client.delete(`/user/area/${userId}`, {
			data: { areaId },
		})
	).data;
};

export default function useDeleteUserArea(req: AuthRequest) {
	return useMutation<AddUserResponse, Error>(() => deleteUserArea(req), {});
}
