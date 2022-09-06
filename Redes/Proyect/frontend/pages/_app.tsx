import "../styles/globals.scss";
import { Loading } from "@carbon/react";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useRouter } from "next/router";
import { UserContext, User } from "../components/user";
import type { AppProps } from "next/app";

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
				console.log(u);
				setUser(u);
			} catch (err) {
				router.push("/login");
			}
		};
		checkUser();
	}, [user]);

	return (
		<UserContext.Provider value={user}>
			{!user && pageProps.page !== "login" ? (
				<Loading description="Active loading indicator" withOverlay={true} />
			) : (
				<Component {...pageProps} />
			)}
		</UserContext.Provider>
	);
}

export default MyApp;
