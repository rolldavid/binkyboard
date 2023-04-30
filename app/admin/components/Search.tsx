"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query";
import { searchEmail } from "@/lib/db-utils";
import styles from "./Search.module.css"
import UserItem from "./UserItem";
import { User } from "@prisma/client";

let timeoutId: ReturnType<typeof setTimeout>;

export default function Search () {
    const [email, setEmail] = useState("")
    const [results, setResults] = useState<User | undefined>(undefined)

    const {data, status} = useQuery(["search"], () => {
        return searchEmail(email)
      })
    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId)
      
        const handleLookup = async () => {
          if (!email) {
              setResults(undefined)
              return
          }
          if (email.length >= 4) {
              const userResult = await searchEmail(email)
              setResults(userResult.user)
          }
        }
        timeoutId = setTimeout(handleLookup, 350)
  
    }, [email])

    return (
        
            <div className={styles.container}>
                <input 
                    name="search"
                    value={email} 
                    className={styles.searchbar}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Search for a user . . ."
                />
                {results &&
                    <UserItem user={results}/>
                }
                {!results && email.length > 0 && <div className={styles.noUser}>
                    No user found
                </div>}
            </div>
            
        
    )
}