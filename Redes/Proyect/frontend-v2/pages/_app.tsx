import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/table/lib/css/table.css";
import { useEffect, useState } from "react";

import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { IUser } from "types/user";
import { UserContext } from "../hooks/user";
import client from "@services/http";
import { useRouter } from "next/router";
// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	const [user, setUser] = useState<IUser | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			try {
				const { data } = await client.get("auth/logged");
				setUser(data);
			} catch (err) {
				router.push("/login");
			}
		};
		checkUser();
	}, [Component]);

	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<UserContext.Provider value={user}>
				<Component {...pageProps} />
			</UserContext.Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
