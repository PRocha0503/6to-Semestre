import type { IconName } from "@blueprintjs/icons";

export declare type DocumentQueryKeys = 
    | "document"
    | "documents"

export declare interface IDocument {
    title: string;
}

export declare interface ITag {
    name: string;
    color: string;
    icon?: IconName;
}