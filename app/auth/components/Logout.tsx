import Link from "next/link"
import styles from "./Logout.module.css"

export default function Logout() {
    return (
     
        <a className={styles.logoutButton} href="/api/auth/logout" target="_top">
            Logout
        </a>
      
    )
}