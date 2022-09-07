import { TreeNode } from "@carbon/react";
import { Folder } from "@carbon/react/icons";
import { useState } from "react";
import Image from "next/image";
import renderTree from "../helpers/renderTree";
import { isBuffer } from "cypress/types/lodash";

interface Node {
	id: number;
	label: string;
	ch?: Node[];
}

const OurTreeNode = ({ ch, id, label, ...nodeProps }: Node) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<TreeNode
			key={id}
			renderIcon={() =>
				expanded ? (
					<Image src="/icons/filledFolder.svg" height={16} width={16} />
				) : (
					<Folder />
				)
			}
			isExpanded={expanded}
			onClick={() => {
				if (!ch) return;
				setExpanded((prev) => !prev);
			}}
			label={<span>{label}</span>}
			value={label}
			{...nodeProps}
		>
			{renderTree({ nodes: ch })}
		</TreeNode>
	);
};

export default OurTreeNode;
