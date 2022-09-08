import { TreeNode } from "@carbon/react";
import { Folder } from "@carbon/react/icons";
import { useState } from "react";
import Image from "next/image";
import renderTree from "../helpers/renderTree";

import { isBuffer } from "cypress/types/lodash";

interface Node {
	_id: string;
	name: string;
	insideFolders: Node[];
	insideDocuments: [];
	path: String;
	tags: [];
	createdBy: {};
}

const OurTreeNode = ({
	insideFolders,
	_id,
	name,
	insideDocuments,
	...nodeProps
}: Node) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<TreeNode
			id={_id}
			renderIcon={() =>
				expanded ? (
					<Image src="/icons/filledFolder.svg" height={16} width={16} />
				) : (
					<Folder />
				)
			}
			isExpanded={expanded}
			onClick={() => {
				if (insideFolders?.length == 0 && insideDocuments?.length == 0) return;
				setExpanded((prev) => !prev);
			}}
			label={name}
			value={_id}
			{...nodeProps}
		>
			{insideFolders?.length !== 0 && expanded
				? renderTree({ nodes: insideFolders })
				: null}
		</TreeNode>
	);
};

export default OurTreeNode;
