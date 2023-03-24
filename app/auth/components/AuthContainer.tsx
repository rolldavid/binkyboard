"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./AuthContainer.module.css"

export default function AuthContainer() {
  
    const router = useRouter()

    return (
        <>
         <section className={styles.container}>
            
            <div className={styles.authHeader}>
                <h2 className={styles.authHeaderTitle}>
                    {`Welcome!`}
                </h2>
                <p className={styles.authHeaderSubtitle}>
                    {`Continue below to join your family on binkyboard`}
                </p>
            </div>
            <div className={styles.authContainer}>
                <Link href="/api/auth/login" className={styles.authButton}>
                    <p className={styles.authText}>Continue to Login</p>
                </Link>
            </div>
        </section>
        </>
    )
}