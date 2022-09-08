import { TreeNode, TreeView } from "@carbon/react";
import { Folder } from "@carbon/react/icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import renderTree from "../helpers/renderTree";

import styles from "../styles/FolderExplorer.module.scss";
import axios from "axios";

interface Node {
	_id: string;
	name: string;
	insideFolders: Node[];
	insideDocuments: [];
	path: String;
	tags: [];
	createdBy: {};
}

interface FolderExplorerProps {
	onSelect: (node: Node) => void;
}

const FolderExplorer = ({ onSelect }: FolderExplorerProps) => {
	const [nodes, setNodes] = useState<Node[]>([]);

	useEffect(() => {
		const getNodes = async () => {
			try {
				const { data } = await axios.get("http://localhost:8090/api/folder");
				console.log(data);
				setNodes(data);
			} catch (e) {
				console.log(e);
			}
		};
		getNodes();
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
