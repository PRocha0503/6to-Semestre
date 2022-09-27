import type { IconName } from "@blueprintjs/icons";

export declare type DocumentQueryKeys = 
    | "document"
    | "documents"


interface ILog {
    id: string;
    message: string;
    timestamp: number;
}

interface IDocument {
    tags: ITag[],
    _id: number,
    title: string,
    folio: string,
    expediente: string,
    createdAt: Date,
    createdBy:string,
    area: string, 
    logs: ILog[],
}

export declare interface ITag {
    name: string;
}

export declare interface ITagForm {
    name: string;
    icon?: IconName;
}