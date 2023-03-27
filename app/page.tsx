"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import Spinner from "@/lib/Spinner";
import AuthContainer from "./auth/components/AuthContainer";
import Landing from "./home/components/Landing"
import styles from "@/styles/Home.module.css"
import { updateUser } from "@/lib/db-utils";

export default function Page() {
  const [invite, setInvite] = useState("")
  const {isLoading, user, error} = useUser()

  useEffect(() => {
    const inviteLink = localStorage.getItem("invite")
    if (inviteLink) {
      setInvite(inviteLink)
    }
  }, [])

  
  if (isLoading) {
    return <Spinner />
  }


  if (!user) {
    return (
      <div className={styles.container}>
          <AuthContainer />
      </div>
    )
  }

  if (user) {
    return <Landing invite={invite}/>
  }

  return null;
}
