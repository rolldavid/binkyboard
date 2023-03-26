"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserId } from "@/lib/db-utils"
import { useState, useEffect } from "react"
import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"
import Spinner from "@/lib/Spinner"

let updatedUser = false;

export default function NavContainer() {
    const [userRole, setUserRole] = useState("")

    const {isLoading, user, error} = useUser()

    const queryClient = useQueryClient();

    const {data, status} = useQuery(["userId"], () => {
        return getUserId()
    })

    useEffect(() => {
        if (user && !updatedUser) {
            queryClient.invalidateQueries(["userId"])
            updatedUser = true;
        }
    }, [user])

    if (isLoading || !user || error) {
       
        return (
            <div className={styles.container}>
                <NavLinks  userId={""} admin={false} signedIn={false}/>
            </div>
        )
    }
   
    if (user && data) {
      
        if (userRole === "ADMIN") {
            return (
                <div className={styles.container}>
                <NavLinks  userId={data.userId} admin={true} signedIn={true}/>
            </div>
            )
        }

        return (
            <div className={styles.container}>
            <NavLinks  userId={data.userId} admin={false} signedIn={true}/>
        </div>
        )
    }


   return null;
}