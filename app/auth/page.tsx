"use client"

import { useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import AuthContainer from "./components/AuthContainer"
import styles from "@/styles/Auth.module.css"
import { getUserSession } from '@/lib/db-utils';
import Spinner from '@/lib/Spinner';

export default function Page() {
  const router = useRouter();
  const {data, status, isFetching, isRefetching} = useQuery(["session"], () => {
        return getUserSession()
  })

  if (status === "loading" || isFetching || isRefetching) {
    return <Spinner />
  }

  if (status === "success" && data.userId) {
    router.push(`/account/${data.userId}`);
  }

  if (status === "success" && !data.userId) {
    return (
        <div className={styles.container}>
            <div className={styles.authModule}>
                <AuthContainer fromReview={false}/>
            </div>
        </div>
    )
  }
  return <Spinner />
}