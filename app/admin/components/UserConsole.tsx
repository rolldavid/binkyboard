"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { getUserId } from "@/lib/db-utils"
import Search from "./Search"
import Spinner from "@/lib/Spinner"
import styles from "./UserConsole.module.css"

export default function UserManagement () {

    const router = useRouter()

    const {data, status} = useQuery(["userId"], () => {
        return getUserId()
    })

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && data.role === "ADMIN") {
        return (
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <Search />
                </div>
            </div>
        )
    }

    if (status === "success" && data) {
        router.push("/")
    }

    return null;
}