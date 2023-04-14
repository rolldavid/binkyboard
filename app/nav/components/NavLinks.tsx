"use client"

import Link from "next/link";
import Image from "next/image";
import plus from "../assets/plus.png"
import profile from "../assets/profile.png"
import board from "../assets/board.png"
import bell from "../assets/bell.png"
import bellding from "../assets/bellding.png"
import styles from "./NavLinks.module.css"
import pin from "../assets/pin.png"


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
                    <Link href={`/`} className={styles.navItem}>
                        <Image 
                            src={board}
                            width={29}
                            height={29}
                            alt="profile"
                            className={styles.linkIcon}
                        />
                    </Link>

                    <Link href={`/account/${userId}`} className={styles.navItem}>
                        <Image 
                            src={profile}
                            width={30}
                            height={30}
                            alt="profile"
                            className={styles.linkIcon}
                        />
                    </Link>
                    {/* <Link href={`/account/${userId}`} className={styles.navItem}>
                        <Image 
                            src={bellding}
                            width={30}
                            height={30}
                            alt="profile"
                            className={styles.linkIcon}
                        />
                    </Link> */}
                    
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