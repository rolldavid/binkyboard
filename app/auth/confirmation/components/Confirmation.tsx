"use client"

import Link from 'next/link';
/* import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/db-utils'; */
import Spinner from '@/lib/Spinner';
import { updateDisplayName } from '@/lib/db-utils';
import styles from "./Confirmation.module.css"
import { useEffect, useState } from 'react';

export default function Confirmation() {
  
  useEffect(() => {
    const username = localStorage.getItem("displayName")
    if (username) {
      updateDisplayName(username)
    }
  }, [])
  return (
    <div className={styles.container}>
          <h1 className={styles.header}>
            You&apos;re logged in! Close this window and return to your original tab.
          </h1>
       
    
    </div>
  )

};