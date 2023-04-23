"use client"


import Link from "next/link"
import styles from "./AuthContainer.module.css"
import Login from "./Login"

export default function AuthContainer() {
 

    return (
        <div className={styles.outerContainer}>
         <section className={styles.container}>
            
            <div className={styles.authHeader}>
                <h2 className={styles.authHeaderTitle}>
                    {`Welcome!`}
                </h2>
                <p className={styles.authHeaderSubtitle}>
                    {`Continue below to join your family & friends on binkyboard`}
                </p>
            </div>
            <div className={styles.authContainer}>
                <Login />
            </div>
        </section>
        </div>
    )
}