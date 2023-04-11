"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import AuthContainer from "@/app/auth/components/AuthContainer";
import Spinner from "@/lib/Spinner"
import BoardLanding from "./components/BoardLanding";
import styles from "@/styles/Board.module.css"

export default function Page({params: {id}}: {params: { id: string }}) {
  
    const {isLoading, user, error} = useUser()

   
    if (isLoading) {
        return (
            <div className={styles.outerContainer}>
                <Spinner />
            </div>
        )
    }

    if (!isLoading && (!user || error)) {
        return (
            <div className={styles.authContainer}>
                <AuthContainer />
            </div>
        )
    }

    if (user) {
        return <BoardLanding boardId={id}/>
    }

    return null;
}