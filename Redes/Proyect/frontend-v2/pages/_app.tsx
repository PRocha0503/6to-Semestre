import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "../styles/globals.css";
import { Intent, Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { HotkeysProvider } from "@blueprintjs/core";

import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { IUser } from "types/user";
import { UserContext } from "../hooks/user";
import client from "@services/http";
import { useRouter } from "next/router";

import CustomNavBar from "@components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	const [user, setUser] = useState<IUser | null>(null);
	const router = useRouter();
	const authRoute = router.pathname === "/login" ? true : false;

	useEffect(() => {
		const checkUser = async () => {
			try {
				const { data } = await client.get("auth/logged");
				setUser(data);
			} catch (err) {
				router.push("/login");
			}
		};
		authRoute ? null : checkUser();
	}, [Component]);

	return (
		// Provide the client to your App

		<QueryClientProvider client={queryClient}>
			<UserContext.Provider value={user}>
				<HotkeysProvider>
					{authRoute ? (

						<Component {...pageProps} />
					) : user ? (
						<>
							<CustomNavBar />
							<Component {...pageProps} />
						</>
					) : (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100vh",
								padding: "5rem",
							}}
						>
							<Spinner intent={Intent.WARNING} />
						</div>
					)}
				</HotkeysProvider>
			</UserContext.Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
