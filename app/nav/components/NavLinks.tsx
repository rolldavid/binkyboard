"use client"

import Link from "next/link";
import Image from "next/image";
import gift from "../assets/gift.png"
import profile from "../assets/profile.png"
import styles from "./NavLinks.module.css"


export default function NavLinks({userId, admin}: {userId: string, admin: boolean}) {
   
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
                            width={28}
                            height={28}
                            alt="profile"
                            className={styles.linkIcon}
                        />
                    
                    </Link>
                    {admin && <Link href="/create">
                        Create
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