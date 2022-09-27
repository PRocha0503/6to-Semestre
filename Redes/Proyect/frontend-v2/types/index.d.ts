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
}

export declare interface ITag {
	name: string;
	color: string;
	icon?: IconName;
}
