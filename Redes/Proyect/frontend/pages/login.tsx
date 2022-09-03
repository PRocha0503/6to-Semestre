import styles from "../styles/Login.module.scss"

import type { NextPage } from 'next'
import { Button, Form, TextInput } from "carbon-components-react";
import { useState } from 'react';

import Image from 'next/image';

const Login: NextPage = () => {
  const [invalidPassword, setInvalidPassword] = useState(false);
  return (
    <div className={styles.center}>
    <div className={styles.login}>
        <div className={styles.loginBanner}>
          <Image
          height={303}
          width={964}
           src="/images/aao_logo.png"
           alt="Alvaro Obregon Logo"
          />
        </div>
        <div className={styles.formContainer}>
          <h2>Inicio de sesión</h2>
          <Form className={styles.loginForm}>
            <TextInput 
              hideLabel
              id='username-input'
              type='text'
              labelText='username'
              placeholder='Usuario'
              required
            />
            <TextInput.PasswordInput
              hideLabel
              id='password-input'
              type="password"
              labelText="Password"
              placeholder='Password'
              helperText="Password must be at least 6 characters long"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              invalidText="Password must be at least 6 characters long"
              invalid={invalidPassword}
              onInvalid={() => setInvalidPassword(true)}
              required
          />
            <Button>Login</Button> 
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;
