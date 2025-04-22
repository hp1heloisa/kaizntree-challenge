// pages/login.js
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@styles/sign.module.scss"
import Image from "next/image";
import { Button, Form, FormLabel, Link, TextInput } from "@carbon/react";
import { useState } from "react";
import { validateEmail } from "@/utils/utils";
import {WarningFilled} from "@carbon/icons-react"

export default function SignIp() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsValid(true)
    setErrorMessage('')

    if (!email || !password) return setIsValid(false)
    if (!validateEmail(email)) return setIsValid(false)

    setIsLoading(true)
    const res = await signIn("credentials", {
      email: e.target.elements.email_input.value,
      password: e.target.elements.password_input.value,
      redirect: false,
    })
        .then(res => {
            setIsLoading(false)
            return res
        })
        .catch(error => {
            setIsLoading(false)
            return error
        })

    console.log(res)    
    if (res?.ok) router.push("/");
    else {
        setIsValid(false)
        setErrorMessage('Email and/or password incorrects')
    };
  };

  return (
    <div className={styles.signinWrapper}>
    <Image alt="" src="/favicon.ico" width={300} height={300}/>
     <Form className={styles.formDiv} onSubmit={handleLogin} >
        <div className={styles.inputWrapper}>
            <TextInput id="email_input"
            onChange={(e) => setEmail(e.target.value)}  value={email} 
            invalid={!isValid && (!email || !validateEmail(email))} labelText="Email" 
            placeholder="Please type your email" size="xl"
            invalidText={
                email === '' ? 'This field is required' : !validateEmail(email) ? 'Put an email in a valid format' : ''
            }/>
            <TextInput onChange={(e) => setPassword(e.target.value)}  value={password} 
                invalid={!isValid && !password} invalidText={
                    password === '' ? 'This field is required' : ''
                }
                id="password_input" labelText="Password" placeholder="Please type your password"  size="xl" type="password"/>
            {!isValid && errorMessage && <FormLabel className={styles.errorMessage}><WarningFilled /> {errorMessage} </FormLabel>}
        </div>
        <div className={styles.actionWrapper}>
            <Button kind="secondary" type="submit" disabled={isLoading}>Sign in</Button>
            <Link href="/signup" disabled={isLoading}>Create account</Link>
        </div>
     </Form>
        
  </div>
  );
}
