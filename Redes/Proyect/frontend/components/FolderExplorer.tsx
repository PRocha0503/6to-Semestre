import { TreeNode, TreeView } from "@carbon/react";
import { Folder } from "@carbon/react/icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import renderTree from "../helpers/renderTree";

import styles from "../styles/FolderExplorer.module.scss";

interface Node {
	id: number;
	label: string;
	ch?: Node[];
}

interface FolderExplorerProps {
	onSelect: (node: Node) => void;
}

const FolderExplorer = ({ onSelect }: FolderExplorerProps) => {
	const [nodes, setNodes] = useState<Node[]>([]);

	useEffect(() => {
		setNodes([
			{
				id: 1,
				label: "Folder 1",
			},
			{
				id: 2,
				label: "Folder 2",
			},
			{
				id: 3,
				label: "Folder 3",
				ch: [
					{ id: 6, label: "CHILD" },
					{ id: 7, label: "CHILD" },
				],
			},
		]);
	}, []);

	return (
		<div className={styles.folderExplorer}>
			<TreeView
				label="Tree View"
				onSelect={(_ev: PointerEvent, node: any) => onSelect?.(node)}
			>
				{renderTree({ nodes })}
			</TreeView>
		</div>
	);
};

export default FolderExplorer;
