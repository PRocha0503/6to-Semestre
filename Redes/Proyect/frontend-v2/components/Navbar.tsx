import { Alignment, Button, Navbar } from "@blueprintjs/core";

import { useUser } from "@hooks/user";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const CustomNavBar = () => {
	const router = useRouter();
	const user = useUser();

	const logout = async () => {
		localStorage.removeItem("token");
		router.push("/login");
	};

	return (
		<>
			{user ? (
				<Navbar className="custom">
					<Navbar.Group align={Alignment.LEFT}>
						<img src="./images/logo.svg" className={styles.logo} />
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>
						<Navbar.Heading>{user.username}</Navbar.Heading>
						<Navbar.Divider />
						<Button
							className="bp4-minimal"
							icon="home"
							text="Inicio"
							onClick={() => router.push("/")}
						/>
						<Button
							className="bp4-minimal"
							icon="user"
							text="Perfil"
							onClick={() => router.push("/profile")}
						/>
						<Button
							className="bp4-minimal"
							icon="log-out"
							data-cy="logout"
							text="Cerrar Sesión"
							onClick={logout}
						/>
					</Navbar.Group>
				</Navbar>
			) : (
				<></>
			)}
		</>
	);
};

export default CustomNavBar;
