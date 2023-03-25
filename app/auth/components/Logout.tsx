import styles from "./Logout.module.css"

export default function Logout() {
    return (
        <div>
        <a  className={styles.logoutButton} href="/api/auth/logout" target="_top">
            Logout
        </a>
        </div>
    )
}