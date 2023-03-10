"use client"

import Link from "next/link";
import Image from "next/image";
import following from "../assets/house.png"
import profile from "../assets/profile.png"
import styles from "./NavLinks.module.css"


export default function NavLinks({userId}: {userId: string}) {
   
    if (userId !== "nope") {
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
                            alt="notifications"
                            className={styles.linkIcon}
                        />
                    
                    </Link>
                
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