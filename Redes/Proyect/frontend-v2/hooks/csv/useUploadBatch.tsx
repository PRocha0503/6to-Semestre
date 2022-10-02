// import { IDocument } from "types";
import client from "@services/http";
import { useMutation } from "react-query";

interface BatchRequest {
    file: File;
}

interface UploadBatchHookRequest {
    onSuccess: (data: BatchResponse) => void;
    onError: (error: Error) => void;
}

interface BatchResponse {
	
}

const uploadBatch = async (): Promise<BatchResponse> => {
	return (await client.post(`/user`)).data;
};

export default function useUploadBatch(req: UploadBatchHookRequest) {
	return useMutation<BatchResponse, Error>(() => uploadBatch(), {
        onSuccess: req.onSuccess,
        onError: req.onError,
    });
}
