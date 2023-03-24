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
    invite = localStorage.getItem("invite")

    if (invite) {
      router.push(`/board/${invite}`)
     
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