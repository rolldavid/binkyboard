import Link from "next/link"
import styles from "./Login.module.css"

export default function Login() {
    return (
      <div>
        <a  className={styles.loginButton} href="/api/auth/login" target="_top">
            Login
        </a>
      </div>
        
        
    )
}