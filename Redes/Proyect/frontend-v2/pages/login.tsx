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

	const [toast, setToast] = useState([]);

	useEffect(() => {
		if (isSuccess) {
			router.push("/");
		} // do something
		else if (isError) {
			setToast([error]);
		} // do something
	}, [isSuccess, isError]);

	const loginButton = async () => {
		mutate();
	};

	return (
		<div className={styles.root}>
			{isError ? (
				<Toaster>
					{toast.map((t, i) => {
						return (
							<Toast
								message={t.message}
								icon="error"
								intent={Intent.DANGER}
								timeout={3000}
								onDismiss={() => {
									setToast((toast) => toast.filter((_, index) => index !== i));
								}}
							/>
						);
					})}
				</Toaster>
			) : null}
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
								onChange={(e) => setPassord(e.target.value)}
							/>
						</div>

						<Button icon="log-in" large onClick={loginButton}>
							Iniciar Sesión
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
