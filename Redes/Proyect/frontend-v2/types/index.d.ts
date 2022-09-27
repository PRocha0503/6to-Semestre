import type { IconName } from "@blueprintjs/icons";

export declare type DocumentQueryKeys = "document" | "documents";

interface IDocument {
    tags: ITag[],
    _id: number,
	_id: number;
	title: string;
	folio: string;
	expediente: string;
	createdAt: Date;
	createdBy: string;
	area: string;
    logs: string[];
}

export declare interface ITag {
    name: string;
}

export declare interface ITagForm {
    name: string;
    icon?: IconName;
}
	

export declare interface ITag {
	name: string;
	color: string;
	icon?: IconName;
}
