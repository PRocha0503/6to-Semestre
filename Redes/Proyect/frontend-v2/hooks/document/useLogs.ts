import { IDocument } from "types";
import client from "@services/http";
import { useQuery } from "react-query";
import { Http2SecureServer } from "http2";
import { Method } from "axios";
import { IUser } from "types/user";
import { ILog } from "types/logs";



interface LogsResponse {
    _id: string;
    logs: ILog[];
}

const fetchLogs = async (id: string): Promise<LogsResponse> => {
    console.log(id);
    return (await client.get(`/docs/logs/${id}`)).data;
};

export default function useLogs(id: string) {
    return useQuery<LogsResponse, Error>(
        ["get-logs-by-document-id", id], () => fetchLogs(id)
    )

}