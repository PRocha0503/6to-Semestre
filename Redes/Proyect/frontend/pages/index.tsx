import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import FolderExplorer from "../components/FolderExplorer";
import { useState, useEffect } from "react";
import { useUser } from "../components/user";
import { useRouter } from "next/router";
import SelectedItem from "../components/SelectedItem";
import LogTab from "@/components/LogTab";

const Home: NextPage = () => {
	const user = useUser();

	const [selectedNode, setSelectedNode] = useState<any>(null);
	const logs = [
		{ date: new Date(200), user: { username: "test" } },
		{ date: new Date(), user: { username: "a" } },
		{ date: new Date(), user: { username: "b" } },
		{ date: new Date(), user: { username: "test" } },
	];
	return (
		<div className={styles.container}>
			<div className={styles.contentLayout}>
				<FolderExplorer onSelect={(node) => setSelectedNode(node)} />
				<div>{selectedNode && <SelectedItem f={selectedNode} />}</div>
			</div>
		</div>
	);
};

export default Home;
