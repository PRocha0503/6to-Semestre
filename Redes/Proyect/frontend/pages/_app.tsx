import "../styles/globals.scss";
import { Loading } from "@carbon/react";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useRouter } from "next/router";
import { UserContext, User } from "../hooks/user";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			try {
				const { data: u } = await axios({
					method: "GET",
					url: "http://localhost:8090/api/" + "auth/logged",
				});
				setUser(u);
			} catch (err) {
				router.push("/login");
			}
		};
		checkUser();
	}, [Component]);

	if (!user && pageProps.page !== "login") {
		return <Loading description="Active loading indicator" withOverlay={true} />
	}

	if (pageProps.page === "login")
		return <Component {...pageProps} />

	return (
		<UserContext.Provider value={user}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserContext.Provider>
	);
}

export default MyApp;
