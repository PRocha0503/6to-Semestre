import { IDocument } from "types";
import client from "@services/http";
import { useQuery } from "react-query";
import { ILog } from "types/logs";


interface LogsResponse {
    _id: string;
    logs: ILog[];
}

const fetchLogs = async (id: string): Promise<LogsResponse> => {
    return (await client.get(`/docs/logs/${id}`)).data;
};

export default function useLogs(id: string) {
    return useQuery<LogsResponse, Error>(
        ["get-logs-by-document-id",id], () => fetchLogs(id)
    )

}