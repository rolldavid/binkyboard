"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import Spinner from "@/lib/Spinner";
import AuthContainer from "./auth/components/AuthContainer";
import Landing from "./home/components/Landing"
import styles from "@/styles/Home.module.css"
import { updateUser } from "@/lib/db-utils";

export default function Page() {
  const {isLoading, user, error} = useUser()

  
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
   
    return <Landing />
  }

  return null;
}
