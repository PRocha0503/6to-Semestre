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

const addUserArea = async ({
	areaId,
	userId,
}: AuthRequest): Promise<AddUserResponse> => {
	return (await client.post(`/user/area/${userId}`, { areaId })).data;
};

export default function useAddUserArea(req: AuthRequest) {
	return useMutation<AddUserResponse, Error>(() => addUserArea(req), {});
}