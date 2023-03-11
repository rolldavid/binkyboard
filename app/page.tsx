"use client"

import { getSession } from "@/lib/db-utils"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/lib/Spinner"
import AuthContainer from "./auth/components/AuthContainer"
import Collection from './post/components/Collection'
import CreatePost from './post/components/CreatePost'
import styles from '@/styles/Home.module.css'

export default function Page() {
  const { data, status } = useQuery(["user"], () => {
    return getSession()
  });

  if (status === "loading") {
      return <Spinner />
  }

  if (data && !data.session) {
    return (
         <div className={styles.authModuleContainer} >
            <div className={styles.authModule}>
                <AuthContainer />
            </div>
         </div>
    )
  }

  return (
    <main className={styles.container}>
      <CreatePost />
      <Collection />
    </main>
  )
}
