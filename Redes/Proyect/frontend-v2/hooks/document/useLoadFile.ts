// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";

interface LoadFileRequest {
	file: File;
	id: string;
}

interface LoadFileResponse {
	id: string;
	title: string;
}

const loadFile = async ({
	file,
	id,
}: LoadFileRequest): Promise<LoadFileResponse> => {
	let bodyFormData = new FormData();
	bodyFormData.append("file", file);
	console.log(file);
	return (
		await client.post(`/docs/load/${id}`, bodyFormData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
	).data;
};

export default function useLoadFile(req: LoadFileRequest) {
	const queryClient = useQueryClient();
	return useMutation<LoadFileResponse, Error>(() => loadFile(req), {});
}
