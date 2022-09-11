import styles from "../styles/Login.module.scss";

import type { NextPage } from "next";
import type {
	FieldValues,
	SubmitHandler,
	SubmitErrorHandler,
} from "react-hook-form";
import axios from "axios";

import { Button, Form, TextInput } from "@carbon/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";


const Login: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = async ({
		username,
		password,
	}) => {
		try {
			await axios({
				method: "POST",
				url: "http://localhost:8090/api/" + "auth/login",
				data: {
					username,
					password,
				},
				headers: {
					"Content-Type": "application/json",
				}
			});
			router.push("/");
		} catch (e) {
			console.log(e);
		}
	};
	const onError: SubmitErrorHandler<FieldValues> = (errors) =>
		console.log(errors);

	return (
		<div className={styles.center}>
			<div className={styles.login}>
				<div className={styles.loginBanner}>
					<Image
						height={303}
						width={964}
						src="/images/aa_logo.png"
						alt="Alvaro Obregon Logo"
					/>
				</div>
				<div className={styles.formContainer}>
					<h2>Inicio de sesión</h2>
					<Form
						className={styles.loginForm}
						onSubmit={handleSubmit(onSubmit, onError)}
					>
						<TextInput
							id="username-input"
							type="text"
							labelText="Usuario"
							placeholder="Usuario"
							invalid={!!errors.username}
							invalidText={"Field must have between 1 and 30 characters"}
							{...register("username", {
								minLength: 1,
								maxLength: 30,
								pattern: /^[A-Za-z]+$/,
								required: true,
							})}
						/>
						<TextInput.PasswordInput
							id="password-input"
							type="password"
							labelText="Password"
							placeholder="Password"
							helperText="Password must be at least 6 characters long"
							invalid={!!errors?.password}
							invalidText="Password must be at least 6 characters long"
							{...register("password", {
								minLength: 3,
								required: true,
							})}
						/>
						<Button type="submit">Login</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	return {
		props: {
			page: "login",
		},
	};
}

export default Login;
