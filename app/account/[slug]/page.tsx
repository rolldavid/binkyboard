"use client"

import { useState, SyntheticEvent } from "react"
import { useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import Spinner from "@/lib/Spinner"
import { getProfile } from "@/lib/db-utils"

import styles from "@/styles/Account.module.css"

export default function Page({params: {slug}}: {params: { slug: string }}) {

   const { data, status } = useQuery(["user"], () => {
      return getProfile(slug)
    });

  if (status === "loading") {
      return <Spinner />
  }

  const handleLogout = (e: SyntheticEvent) => {
    signOut({
        callbackUrl: "/"
    });
    }

  if (status === "success") { 

      return (
            <div>
               {data.displayName}
               <div className={styles.optionButton} onClick={handleLogout}>
                    Logout
                </div>
            </div>
         )
  }

  return null;
}

