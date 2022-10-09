import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
	Button,
	H1,
	InputGroup,
	Intent,
	Label,
	Toaster,
	Toast,
} from "@blueprintjs/core";

import { Tooltip2 } from "@blueprintjs/popover2";
import useLogin from "../hooks/auth/useAuth";
import { useRouter } from "next/router";
import Notifications from "@components/Notifications";

import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassord] = useState("");
	const router = useRouter();

	const lockButton = (
		<Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`}>
			<Button
				icon={showPassword ? "unlock" : "lock"}
				intent={Intent.WARNING}
				minimal={true}
				onClick={() => setShowPassword(!showPassword)}
			/>
		</Tooltip2>
	);
	const { mutate, data, isError, isSuccess, error } = useLogin({
		password,
		username,
	});

	const [toast, setToast] = useState<any>([]);

	useEffect(() => {
		if (isSuccess) {
			setToast([{ message: "Autenticado Correctamente", type: "success" }]);
			router.push("/");
		} else if (isError) {
			switch (error.code) {
				case "ERR_BAD_REQUEST":
				 setToast([
					{
						message: "Usuario o contraseña incorrectos",
						type: "danger",
					},
				]);
				return;
			default:
				setToast([...toast, { message: error.message, type: "danger" }]);
			} 
		}
	}, [isSuccess, isError]);

	const loginButton = async () => {
		mutate();
	};

	return (
		<div className={styles.root}>
			<Notifications toast={toast} setToast={setToast} />

			<div className={styles.useArea}>
				<img
					src="/images/aa_logo.png"
					alt="Alvaro Obregon Logo"
					className={styles.logo}
				/>
				<div className={styles.loginSquare}>
					<H1 className={styles.title}>Inicio de sesión</H1>
					<div className={styles.form}>
						<div className={styles.input}>
							<Label htmlFor="username-input">Usuario</Label>
							<InputGroup
								id="username-input"
								large={true}
								placeholder="usuario"
								type={"text"}
								value={username}
								name="username"
								data-cy="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className={styles.input}>
							<Label htmlFor="password-input">Contraseña</Label>
							<InputGroup
								id="password-input"
								large={true}
								placeholder="Por favor ingrese su usuario"
								rightElement={lockButton}
								type={showPassword ? "text" : "password"}
								value={password}
								name="password"
								data-cy="password"
								onChange={(e) => setPassord(e.target.value)}
							/>
						</div>

						<Button icon="log-in" large type="submit" data-cy="login" onClick={(e) => {
							e.preventDefault();
							loginButton()
						}}>
							Iniciar Sesión
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
