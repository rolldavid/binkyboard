"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import UserConsole from "./components/UserConsole"
import Spinner from "@/lib/Spinner"
import styles from "@/styles/Board.module.css"

export default function Page({params: {id}}: {params: { id: string }}) {
  
    const {isLoading, user, error} = useUser()
    const router = useRouter()

    if (isLoading) {
        return (
            <div className={styles.outerContainer}>
                <Spinner />
            </div>
        )
    }

    if (!isLoading && (!user || error)) {
        router.push("/")
    }

    if (user) {
        return <UserConsole />
    }

    return null;
}