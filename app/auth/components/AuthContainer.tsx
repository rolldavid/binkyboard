"use client"


import Image from "next/image"
import { SyntheticEvent, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react"
import { LoginProps } from "../types";
import google from "../assets/google.png"
import wand from "../assets/wand.png"

import styles from "./AuthContainer.module.css"

const schema = yup
.object({
  email: yup.string().email().required(),
})
.required();

export default function AuthContainer() {
    const [value, setValue] = useState("")
    const [submitted, setSubmitted] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<LoginProps>({
        resolver: yupResolver(schema),
      });

    const handleLogin = async (data: LoginProps) => {
      
        await signIn("email", {
            email: data.email,
            redirect: false,
            callbackUrl: "/auth/confirmation", 
        })
        setSubmitted(true)
    }

    const handleGoogle = async (e: SyntheticEvent) => {
        e.preventDefault();
        await signIn("google")
    }
    return (
        <>
        
        {!submitted && <section className={styles.container}>
            
            <div className={styles.authHeader}>
                <h2 className={styles.authHeaderTitle}>
                    {`Hey there!`}
                </h2>
                <p className={styles.authHeaderSubtitle}>
                    {`Continue below to post things to Kelly & David's binkyboard`}
                </p>
            </div>
            <div className={styles.googleContainer}>
                <div onClick={handleGoogle} className={styles.googleButton}>
                    <Image src={google} width={25} height={25} alt="Google icon"/>
                    <p className={styles.googleText}>Continue with Google</p>
                </div>
            </div>
            <div className={styles.loginLine}>
                <span className={styles.loginOr}>OR</span>
            </div>
            <div className={styles.emailContainer}>
                <form className={styles.formContainer}>
                    <input 
                        {...register("email")}
                        type="email"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="jane@gmail.com"
                        className={styles.inputContainer}
                    />
                    <div
                        onClick={handleSubmit(handleLogin)}
                        className={styles.emailButton}
                    >
                        Continue with Email
                    </div>
                    <div
                        className={styles.emailNote}
                    >
                        
                        <p className={styles.noteText}> <Image src={wand} width={15} height={15} alt="magic wand" className={styles.noteImg}/> We'll email you a magic link. No password required.</p>
                    </div>
                </form>
            </div>
            
        </section>
        
        }

        {submitted && <section className={styles.checkContainer}>
        <Image src={wand} width={30} height={30} alt="magic wand" className={styles.noteImg}/>
            <p className={styles.checkText}>We've emailed you a magic link - <span className={styles.highlight}>return to this tab</span> once you&apos;ve confirmed.</p>
            </section>}
        
        </>
    )
}