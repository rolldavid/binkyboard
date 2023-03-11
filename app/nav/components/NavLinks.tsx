"use client"

import Link from "next/link";
import Image from "next/image";
import gift from "../assets/gift.png"
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
                <a target="_blank" href={`https://www.babylist.com/list/baby-kelly-wilkins`} className={styles.navItem}>
                        <Image 
                            src={gift}
                            width={26}
                            height={26}
                            alt="gift"
                            className={styles.linkIcon}
                        />
                    </a>
                    <Link href={`/account/${userId}`} className={styles.navItem}>
                        <Image 
                            src={profile}
                            width={28}
                            height={28}
                            alt="profile"
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