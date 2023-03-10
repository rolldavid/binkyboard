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


    if (data && data.userId && status === "success") {
        return (
            <>
            <div className={styles.desktop}>
                <NavLinks  userId={data.userId}/>
            </div>
        </>
        )
    }


    return (

        <div className={styles.desktop}>
            <NavLinks  userId={"nope"}/>
        </div>
 
    )
}