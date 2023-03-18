"use client"

import { useSearchParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/db-utils"
import AuthContainer from "@/app/auth/components/AuthContainer";
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"


export default function NavContainer() {
    const searchParams = useSearchParams();

    let error: string | null = null;

    if (searchParams) {
        const error = searchParams.get('error');
    }

    const {data, status} = useQuery(["session"], () => {
        return getUserSession()
    })

    if (data && !data.session && status === "success") {
        return (

            <div className={styles.container}>
                <NavLinks  userId={"nope"} admin={false}/>
                <div className={styles.authModuleContainer} >
                    <div className={styles.authModule}>
                        <AuthContainer error={error}/>
                    </div>
                </div>
            </div>
     
        )
    }


    if (data && data.userId && status === "success") {
       
        localStorage.setItem("user", data.email)
        return (
            <>
            <div className={styles.container}>
                <NavLinks  userId={data.userId} admin={true}/>
            </div>
        </>
        )
    }


   return null;
}