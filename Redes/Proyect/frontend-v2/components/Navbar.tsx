import { Alignment, Button, Navbar } from "@blueprintjs/core";

import { useUser } from "@hooks/user";
import { useRouter } from "next/router";

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
				<Navbar className="bp4-dark">
					<Navbar.Group align={Alignment.RIGHT}>
						<Navbar.Heading>{user.username}</Navbar.Heading>
						<Navbar.Divider />
						<Button
							className="bp4-minimal"
							icon="home"
							text="Home"
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
