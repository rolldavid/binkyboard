"use client"


import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/db-utils"
import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"


export default function NavContainer() {

    const {data, status} = useQuery(["nav"], () => {
        return getUserSession()
    })

    if (status === "success" && data && !data.session) {
        return (
            <div className={styles.container}>
            <NavLinks  userId={data.userId} admin={false} signedIn={false}/>
        </div>
        )
    }


    if (data && data.userId && status === "success") {
        return (
            <div className={styles.container}>
                <NavLinks  userId={data.userId} admin={true} signedIn={true}/>
            </div>
        )
    }


   return null;
}