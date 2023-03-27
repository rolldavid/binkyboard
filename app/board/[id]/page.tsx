"use client"

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getBoard, removeBoard, sendAccessEmail } from "@/lib/db-utils";
import AuthContainer from "@/app/auth/components/AuthContainer";
import Spinner from "@/lib/Spinner"
import CreatePost from "./components/CreatePost"
import BoardHeader from './components/BoardHeader';
import Collection from '@/app/post/components/Collection';
import BoardLanding from "./components/BoardLanding";
import styles from "@/styles/Board.module.css"
import { SyntheticEvent, useEffect, useState } from "react";
import BoardOptions from "./components/BoardOptions";

export default function Page({params: {id}}: {params: { id: string }}) {
  
    const {isLoading, user, error} = useUser()

   

    if (isLoading) {
        return <Spinner />
    }

    if (!isLoading && (!user || error)) {
        return (
            <div className={styles.authContainer}>
                <AuthContainer />
            </div>
        )
    }

    if (user) {
        return <BoardLanding boardId={id}/>
    }

    return null;
}
