"use client"

import { useState, SyntheticEvent, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import Spinner from "@/lib/Spinner"
import { getProfile } from "@/lib/db-utils"

import styles from "@/styles/Account.module.css"

let holdName = "";
let heldName = false;

export default function Page({params: {slug}}: {params: { slug: string }}) {

    const [displayName, setDisplayName] = useState("")
    const [saveName, setSaveName] = useState(false)

    const { data, status } = useQuery(["profile"], () => {
        return getProfile(slug)
      });


    useEffect(() => {
      if (status === "success" && data.displayName) {
        setDisplayName(data.displayName)
        if (!heldName) {
          holdName = data.displayName;
        }
      }
    }, [data])

    useEffect(() => {

      if (!displayName) {
        return
      }

      if (!heldName && displayName) {
        heldName = true;
      }

      if (heldName && displayName === holdName) {
        setSaveName(false)
        return;
      }

      if (heldName && displayName !== holdName) {
        setSaveName(true)
      }


    }, [displayName])

    if (status === "loading") {
        return <Spinner />
    }

    const handleChange = (e: SyntheticEvent, value: string) => {
      e.preventDefault()
      setDisplayName(value)
      
    }

    const handleLogout = (e: SyntheticEvent) => {
      localStorage.setItem("user", "")
      signOut({
          callbackUrl: "/"
      });
      }

  if (status === "success" && data) { 

      return (
            <div className={styles.container}>
              <div className={styles.nameContainer}>
                  <p className={styles.nameTitle}>Display Name</p>
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => handleChange(e, e.target.value)}
                    className={styles.nameInput}
                  />
                  {saveName && <div className={styles.saveContainer}>
                      <button className={styles.saveButton}>
                        Save
                      </button>
                  </div>}
              </div>
               
               <button className={styles.logoutButton} onClick={e => handleLogout(e)}>
                    Logout
                </button>
            </div>
         )
  }

  return null;
}

