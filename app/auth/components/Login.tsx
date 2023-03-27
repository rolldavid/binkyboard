import Link from "next/link"
import { usePathname } from 'next/navigation'
import styles from "./Login.module.css"

export default function Login() {
    const pathname = usePathname()
    
    if (pathname) {
        return (
            <Link className={styles.loginButton} href={`/api/auth/login?returnTo=${encodeURIComponent(pathname)}`} target="_top">
                Login
            </Link>         
        )
    }

    return (
        <Link className={styles.loginButton} href="/api/auth/login" target="_top">
            Login
        </Link>         
    )
    
}