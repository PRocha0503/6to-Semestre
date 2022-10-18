// import { IDocument } from "types";
import client from "@services/http";
import { useMutation, useQueryClient } from "react-query";


interface UploadBatchHookRequest {
    file: File | null;
    onSuccess: (data: BatchResponse) => void;
    onError: (error: Error) => void;
}

interface BatchResponse {
	
}

const uploadBatch = async (formData: FormData): Promise<BatchResponse> => {
	return (await client.post(`/docs/batch`,  formData)).data;
};

export default function useUploadBatch(req: UploadBatchHookRequest) {
    const bodyFormData = new FormData();
	bodyFormData.append("file", req?.file || new File([], "empty"));
    const queryClient = useQueryClient();
	return useMutation<BatchResponse, Error>(() => uploadBatch(bodyFormData), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["query-documents"]);
            req.onSuccess(data)
        },
        onError: req.onError,
    });
}
