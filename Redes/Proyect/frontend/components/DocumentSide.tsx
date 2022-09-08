import { TreeNode } from "@carbon/react";
import { Account } from "@carbon/react/icons";
import { useState } from "react";
import Image from "next/image";
interface Document {
	_id: string;
	title: string;
	path: String;
	tags: [];
	createdBy: {};
}

const DocumentSide = ({ _id, title, ...other }: Document) => {
	return (
		<TreeNode
			id={_id}
			renderIcon={() => <Account />}
			isExpanded={false}
			onClick={() => {
				console.log("CLICK");
			}}
			label={title}
			value={"DOCUMENT"}
			{...other}
		></TreeNode>
	);
};

export default DocumentSide;
