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
	metadata: any;
	hasFile: boolean;
}

export declare interface ITag {
	name: string;
}

export declare interface ITagForm {
	name: string;
	icon?: IconName;
	color: string;
	_id: string
}
