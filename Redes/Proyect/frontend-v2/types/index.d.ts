import type { IconName } from "@blueprintjs/icons";

export declare type DocumentQueryKeys = "document" | "documents";

interface IDocument {
	tags: ITag[];
	_id: number;
	title: string;
	folio: string;
	expediente: string;
	createdAt: Date;
	createdBy: string;
	area: string;
	logs: string[];
	meta: any;
}

export declare interface ITag {
	name: string;
}

export declare interface ITagForm {
	name: string;
	icon?: IconName;
}
