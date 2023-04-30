"use client"

import { SyntheticEvent, useState } from "react"
import { User } from "@prisma/client"
import { updateUserRole } from "@/lib/db-utils"
import Spinner from "@/lib/Spinner"
import styles from "./UserItem.module.css"

export default function UserItem ({ user }: { user: User }) {
    const [username, setUsername] = useState("")
    const [role, setRole] = useState(user.role)
    const [loadingUser, setLoadingUser] = useState(false)
    const [loadingRole, setLoadingRole] = useState(false)

    const handleRole = async (e: SyntheticEvent) => {

        e.preventDefault()
        setLoadingRole(true)
        await updateUserRole(user.id, role)
        setLoadingRole(false)
    }

   

    return (
        <div className={styles.container}>
            
                <div>
                    <div className={styles.userSettings}>
                        <p className={styles.settingsTitle}>Edit User Settings</p>
                    </div>
                    
                   {/*  <p>Username</p>
                    <div className={styles.usernameContainer}>
                        <input 
                            name="username"
                            value={username} 
                            className={styles.adminInput}
                            onChange={e => setUsername(e.target.value)}
                            placeholder={`${user.name}`}
                        />
                        <button className={styles.saveButton}>{loadingUser ? <Spinner/> : "Save"}</button>
                    
                    </div> */}
                </div>

                <div>
                   
                    <div className={styles.itemContainer}>
                        <div className={styles.inputContainer}>
                            <p className={styles.roleTitle}>Role</p>
                            <input 
                                name="role"
                                value={role} 
                                className={styles.inputItem}
                                onChange={e => setRole(e.target.value)}
                                
                            />
                        </div>
                        <button className={styles.saveButton} onClick={handleRole}>{loadingRole ? <Spinner/> : "Save"}</button>
                        
                    </div>
                </div>
        </div>
    )
}

