
import Search from "./Search"
import styles from "./UserConsole.module.css"

export default function UserManagement () {
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <Search />
            </div>
        </div>
    )
}