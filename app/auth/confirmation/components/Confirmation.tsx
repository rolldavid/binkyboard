"use client"


import { useRouter } from 'next/navigation';
import Spinner from '@/lib/Spinner';
import { updateDisplayName } from '@/lib/db-utils';
import styles from "./Confirmation.module.css"
import { useEffect, useState } from 'react';

let invite: string | null = ""

export default function Confirmation() {
  
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem("displayName")
    invite = localStorage.getItem("invite")

    if (username) {
      updateDisplayName(username)
    }

    if (invite) {
      router.push(`/${invite}`)
     
    } else {
      router.push(`/`)
    }
  }, [])
  

  return (
    <div className={styles.container}>
          <h1 className={styles.header}>
            You&apos;re logged in! Redirecting...
          </h1>
    </div>
  )

};