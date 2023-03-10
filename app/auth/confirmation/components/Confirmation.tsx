"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/db-utils';
import Spinner from '@/lib/Spinner';
import styles from "./Confirmation.module.css"

export default function Confirmation() {
  const router = useRouter();
  const {data, status} = useQuery(["session"], () => {
    return getSession()
  })

  if (status !== "loading" && !data || status === "error") {
    router.push('/auth');
  }

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <Spinner />
      ) : !data.session ? (
        <Spinner />
      ) : (
        <>
          <h1 className={styles.header}>
            You&apos;re logged in! Close this window and return to your original tab.
          </h1>
        </>
      )}
    </div>
  );
};