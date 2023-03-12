"use client"

import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/db-utils"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"


export default function NavContainer() {
  
    const {data, status} = useQuery(["session"], () => {
        return getUserSession()
    })


    if (data && data.userId && data.role === "ADMIN" && status === "success") {
        console.log("is an admin")
        console.log(data.role)
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks  userId={data.userId} admin={true}/>
            </div>
        </>
        )
    }

    if (data && data.userId && status === "success") {
        console.log(data.role)
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks  userId={data.userId} admin={false}/>
            </div>
        </>
        )
    }


    return (

        <div className={styles.desktop}>
            <NavLinks  userId={"nope"} admin={false}/>
        </div>
 
    )
}