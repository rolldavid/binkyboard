"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserId } from "@/lib/db-utils"
import { useRouter } from "next/navigation"
import CreateBoard from "./components/CreateBoard"
import styles from "@/styles/Create.module.css"
import Spinner from "@/lib/Spinner"

export default function Page() {

    const {data, status} = useQuery(["userId"], () => {
        return getUserId()
    })

    const router = useRouter()

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "success" && data) {
        if (data.role === "ADMIN") {
            return (
                <div className={styles.container}>
                    <CreateBoard />
                </div>
            )
        }

        if (data.role === "SUPER") {
            return (
                <div className={styles.container}>
                    <CreateBoard />
                </div>
            )
        }

        router.push("/")

    }

    return null
}