"use client"

import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/db-utils";
import Spinner from "@/lib/Spinner";
import AuthContainer from "./auth/components/AuthContainer";
import Landing from "./home/components/Landing"
import styles from "@/styles/Home.module.css"

export default function Page() {
  const {data, status} = useQuery(["landing"], () => {
    return getSession()
  })
  
  if (status === "loading") {
    return <Spinner />
  }

  if (status === "success" && !data.session) {
    return (
      <div className={styles.container}>
          <AuthContainer />
      </div>
      
    )
  }

  if (status === "success" && data.session) {
    return <Landing />
  }

  return null;
}
