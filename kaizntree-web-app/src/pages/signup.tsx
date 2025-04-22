import { useRouter } from "next/router";
import styles from "@styles/sign.module.scss"
import Image from "next/image";
import { Button, Form, FormLabel, Link, TextInput } from "@carbon/react";
import { useState } from "react";
import { createAccount } from "@/utils/functions";
import {WarningFilled} from "@carbon/icons-react"
import { validateEmail } from "@/utils/utils";

export default function SignUp() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

 
  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsValid(true);
    setErrorMessage('');

    if (password!== confirmPassword) return setIsValid(false)

    if (!email || !password || !confirmPassword) return setIsValid(false)

    if (!validateEmail(email)) return setIsValid(false)

    setIsLoading(true)
    const res = await createAccount({email,password, confirm_password: password })
        .then(res => {
            setIsLoading(false)
            return res
        })
        .catch(error => {
            setIsLoading(false)
            return error
        })
    

    if (!res.error) router.push("/signin");
    else {
        setErrorMessage(res.error)
        setIsValid(false);
    }
  };

  return (
    <div className={styles.signinWrapper}>
    <Image alt="" src="/favicon.ico" width={300} height={300}/>
     <Form className={styles.formDiv} onSubmit={handleLogin}  >
        <div className={styles.inputWrapper}>
            <TextInput onChange={(e) => setEmail(e.target.value)}  value={email} 
                invalid={!isValid && (!email || !validateEmail(email))} id="email_input" labelText="Email" 
                placeholder="Please type your email" size="xl"
                invalidText={
                    email === '' ? 'This field is required' : !validateEmail(email) ? 'Put an email in a valid format' : ''
                }/>
            <TextInput onChange={(e) => setPassword(e.target.value)}  value={password} 
                invalid={!isValid && !password} id="password_input" labelText="Password" 
                placeholder="Please create password"  size="xl" type="password"
                invalidText={
                    password === '' ? 'This field is required' : ''
                }/>
            <TextInput onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} 
                invalid={!isValid && (!confirmPassword || password !== confirmPassword)} id="confirm_password_input" labelText="Confirm password" 
                placeholder="Please type the same password"  size="xl" type="password"
                invalidText={
                    confirmPassword === '' ? 'This field is required' : password !== confirmPassword ? 
                    'Passwords are different' : ''
                }/>
            {!isValid && errorMessage && <FormLabel className={styles.errorMessage}><WarningFilled /> {errorMessage} </FormLabel>}
        </div>
        <div className={styles.actionWrapper}>
            <Button kind="secondary" type="submit" disabled={isLoading}>Create Account</Button>
            <Link disabled={isLoading} href="/signin">Already have an account? Sign in</Link>
        </div>
     </Form>
  </div>
  );
}
