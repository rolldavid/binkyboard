"use client"

import Link from "next/link";
import Image from "next/image";
import plus from "../assets/plus.png"
import profile from "../assets/profile.png"
import styles from "./NavLinks.module.css"


export default function NavLinks({userId, admin, signedIn}: {userId: string, admin: boolean, signedIn: boolean}) {
   
    if (!signedIn) {
        return <div>
            <nav className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href={"/"}>
                        <h1 className={styles.logo}>binkyboard</h1>
                    </Link>
                </div>
            </nav>
        </div>
    }

    if (signedIn) {

        return (
            <nav className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href={"/"}>
                        <h1 className={styles.logo}>binkyboard</h1>
                    </Link>
                </div>
                <div className={styles.linkContainer}>
                
                    <Link href={`/account/${userId}`} className={styles.navItem}>
                        <Image 
                            src={profile}
                            width={30}
                            height={30}
                            alt="profile"
                            className={styles.linkIcon}
                        />
                    </Link>
                    {admin && <Link href="/create" className={styles.navItem}>
                        <Image 
                            src={plus}
                            width={25}
                            height={25}
                            alt="create board"
                            className={styles.linkIcon}
                        />
                    </Link>}
                    
                </div>
            </nav>
        )
    }
    return  (
        <nav className={styles.container}>
            <div className={styles.logoContainer}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>binkyboard</h1>
                </Link>
            </div>
            
        </nav>
    )
}