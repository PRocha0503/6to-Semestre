import {
	Alignment,
	Button,
	Classes,
	H5,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
	Switch,
} from "@blueprintjs/core";

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
						<Button className="bp4-minimal" icon="user" text="Perfil" />
						<Button
							className="bp4-minimal"
							icon="log-out"
							text="Logout"
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
