"use client"

import { useState, useEffect } from "react"
import { Square } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import ReactPlayer from "react-player"
import SquareContent from "./SquareContent"
import styles from "./Collection.module.css"
import Spinner from "@/utils/Spinner"

export default function Collection() {
   

    async function getSquares() {
        const res = await fetch("/api/get-squares")
        const data = await res.json()
        return data
    }


    const { data, status } = useQuery(["squareData"], () => {
        return getSquares()
      });

    
    if (status === "loading") {
        <Spinner />
    }

    if (status === "success" && data.squares) {
    return (
        <div className={styles.container}>
            {
                data.squares.map((square: Square, index: number) => {
                    return (
                        <SquareContent key={index} content={square}/>
                    )
                })
            }
                            <ReactPlayer url="https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock" controls={true} width="100%"/>

        </div>
    )}

    return null;
}