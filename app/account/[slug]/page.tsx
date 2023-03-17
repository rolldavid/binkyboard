"use client"

import { useState, SyntheticEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { deleteUser, updateDisplayName } from "@/lib/db-utils"
import Spinner from "@/lib/Spinner"
import { getProfile } from "@/lib/db-utils"

import styles from "@/styles/Account.module.css"

let holdName = "";
let heldName = false;

export default function Page({params: {slug}}: {params: { slug: string }}) {

    const [displayName, setDisplayName] = useState("")
    const [saveName, setSaveName] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDeleteModule, setShowDeleteModule] = useState(false)

    const { data, status } = useQuery(["profile"], () => {
        return getProfile(slug)
      });

    const router = useRouter()

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

    const handleUpdate = async (e: SyntheticEvent) => {
      e.preventDefault()
      setLoading(true)
      await updateDisplayName(displayName)
      holdName = displayName
      router.push("/")
    }

    const handleLogout = (e: SyntheticEvent) => {
      localStorage.setItem("user", "")
      signOut({
          callbackUrl: "/"
      });
      }

    const handleDelete = async (e: SyntheticEvent) => {
      e.preventDefault()
      localStorage.setItem("user", "")
      const res = await deleteUser()
      console.log("done")
      signOut({
          callbackUrl: "/"
      });
      
    }

    if (status === "success" && data) { 

      return (
            <div className={styles.container}>
              {!loading && <div className={styles.nameContainer}>
                  <p className={styles.nameTitle}>Display Name</p>
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={styles.nameInput}
                  />
                  {saveName && <div className={styles.saveContainer}>
                      <button className={styles.saveButton} onClick={e => handleUpdate(e)}>
                        Save
                      </button>
                  </div>}
                  <button className={styles.logoutButton} onClick={e => handleLogout(e)}>
                    Logout
                </button>
                <p className={styles.deletePromptContainer}>Not having fun? <span className={styles.deletePrompt} onClick={() => setShowDeleteModule(true)}>Delete your account</span></p>
              </div>}
              {loading && <div className={styles.container}>
                <Spinner />
              </div>}
              {showDeleteModule && <div className={styles.deleteModuleContainer}>
                  <div className={styles.deleteModule}>
                    {data.ownedBoards.length < 1 ? 
                    <div className={styles.deleteModuleInner}>
                      <p className={styles.deleteTitle}>Are you sure?</p> 
                      <button className={styles.deleteButton} onClick={handleDelete}>Yes, delete</button>
                      <button className={styles.logoutButton} onClick={() => setShowDeleteModule(false)}>Cancel</button>
                    </div> : 
                    <div className={styles.deleteBoards}>
                       <p className={styles.deleteTitle}>You&apos;ve got live boards!</p> 
                        <p className={styles.deleteNote}>You must delete live boards before you can delete your account.</p>
                        <p className={styles.deleteNote}>Click the ⚙️ icon on your board header to update.</p>
                        <button className={styles.logoutButton} onClick={() => setShowDeleteModule(false)}>Close</button>
                    </div>
                  } 
                  </div>

              </div>}
            </div>
         )
  }

  return null;
}

