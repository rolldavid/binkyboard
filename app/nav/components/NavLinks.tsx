"use client"


import Link from "next/link";
import Image from "next/image";
import profile from "../assets/profile.png"
import board from "../assets/board.png"
import styles from "./NavLinks.module.css"
import logo from "../assets/binkylogo.png"
import NotificationIcon from "@/app/notifications/components/NotificationIcon";


export default function NavLinks({userId, admin, signedIn}: {userId: string, admin: boolean, signedIn: boolean}) {
   
    if (!signedIn) {
        return <div>
            <nav className={styles.container}>
                <div className={styles.logoContainer}>
                <Link href={"/"} className={styles.logoInnerContainer}>
                        <Image 
                            src={logo}
                            width={162}
                            height={49}
                            alt="binkyboard logo"
                            className={styles.logo}
                        />
                    </Link>
                </div>
            </nav>
        </div>
    }

    if (signedIn) {

        return (
            <nav className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href={"/"} className={styles.logoInnerContainer}>
                        <Image 
                            src={logo}
                            width={162}
                            height={49}
                            alt="binkyboard logo"
                            className={styles.logo}
                        />
                    </Link>
                </div>
                <div className={styles.linkContainer}>
            
                    <Link href={`/`} className={styles.navItem}>
                        <Image 
                            src={board}
                            width={27}
                            height={27}
                            alt="profile"
                            className={styles.linkIcon}
                            priority
                        />
                    </Link>
                    <Link href={`/account/${userId}`} className={styles.navItem}>
                        <Image 
                            src={profile}
                            width={28}
                            height={28}
                            alt="profile"
                            className={styles.linkIcon}
                            priority
                        />
                    </Link>
                    <div  className={styles.notificationContainer}>
                        <NotificationIcon />
                    </div>
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