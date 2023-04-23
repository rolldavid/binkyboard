"use client"

import { useState, useRef, useEffect, SyntheticEvent } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, updateNotifications } from "@/lib/db-utils"
import { NotificationProps } from "../types"
import Notification from "./Notification";
import welcome from "../assets/celebrate.png"
import bell from "../assets/bell.png"
import bellding from "../assets/bellding.png"
import styles from "./NotificationIcon.module.css"

export default function NotificationIcon() {
    const [showNotifications, setShowNotifications] = useState(false)

    const router = useRouter();

    const ref = useRef<HTMLInputElement>(null)
   
    const queryClient = useQueryClient();

    const {data, status} = useQuery(["notification"], () => {
        return getNotifications()
    })

    useEffect(() => {
        const body = document.querySelector("body")
        if (body && showNotifications) {
            body.style.overflow = "hidden"
        }

        if (body && !showNotifications) {
            body.style.overflow = "auto"
        }

        return () => {
            
            const body = document.querySelector("body")

            if (body) {
                body.style.overflow = "auto"
            }
        }
    }, [showNotifications])


    const handleModalClose = async (e: MouseEvent) => {
        e.preventDefault()
        if (e.target instanceof Element) {
            if (ref.current?.classList[0] === e.target.classList[0]) {
                queryClient.invalidateQueries(['notification'])
                setShowNotifications(false)
            }
        }
    }

    useEffect(() => {
        const element = ref.current
        if (showNotifications && element) {
            element.addEventListener("click", e => handleModalClose(e))
        }
     
        return () => {
            if (element) {
            element.removeEventListener("click", e => handleModalClose(e))
            }
        }
    }, [showNotifications])

    const handleNotifications = (e: SyntheticEvent) => {
        e.preventDefault()
        setShowNotifications(true)
        updateNotifications()
    }



    if (status === "loading") {
        return (
            <div className={styles.notificationIconContainer}>
                <Image 
                    src={bell}
                    width={28}
                    height={28}
                    alt="notifications"
                />
            </div>
        )
    }

    const routeNotification = async (e: SyntheticEvent, slug: string | boolean) => {
        e.preventDefault()
        if (slug) {
            setShowNotifications(false)
            queryClient.invalidateQueries(['notification'])
            router.push(`/board/${slug}`)
        }

    }


    if (status === "success" && data.activeNotifications && data.loggedIn) {
        return (
            <>
            
            {data.activeNotifications.length > 0 && <div className={styles.notificationIconContainer}>
                <Image 
                    src={bellding}
                    width={28}
                    height={28}
                    alt="notifications"
                    onClick={handleNotifications}
                    className={styles.bellImg}
                />
                
             </div>
             }
            {data.activeNotifications.length === 0 && <div className={styles.notificationIconContainer}>
                <Image 
                    src={bell}
                    width={28}
                    height={28}
                    alt="notifications"
                    onClick={handleNotifications}
                    className={styles.bellImg}
                />
             
             </div>
             }

                {status === "success" && showNotifications && data.activeNotifications && data.completeNotifications &&
                    <div className={styles.notificationsModuleContainer} ref={ref}>
                        <div className={styles.notificationsModule}>
                       
                            <div className={styles.notificationOuterContainer}>
                                {data.activeNotifications.length > 0 && <div className={styles.notificationNewContainer}>
                                    <p className={styles.newTitle}>New</p>
                                    {
                                        data.activeNotifications.map((notification: NotificationProps, index: number) => {
                                            return (
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationInner}>
                                                    <Notification notification={notification} status={"new"}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.completeNotifications.length > 0 && <div className={styles.notificationCompleteContainer}>
                                    <p className={styles.recentTitle}>Recent</p>
                                    {
                                        data.completeNotifications.map((notification: NotificationProps, index: number) => {
                                            return (
                                                <div key={index} onClick={(e) => routeNotification(e, notification.slug)} className={styles.notificationInner}>
                                                    <Notification notification={notification} status={"complete"}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {data.activeNotifications.length === 0 && data.completeNotifications.length === 0 && 
                                <div className={styles.notificationContainer}>
                                    <div className={styles.welcomeNotification}>
                                        <h4 className={styles.welcomeTitle}>Welcome!</h4>
                                        <p className={styles.welcomeText}>{`You'll get notified about new posts on your boards`}</p>
                                    </div>
                                    <div className={styles.welcomeImgContainer}>
                                        <Image 
                                        className={styles.welcomeImg} 
                                        src={welcome}
                                        width={50}
                                        height={50}
                                        alt="celebrate icon"/>
                                </div></div>}
                            </div>
                      
                        </div>
                    </div>
                }
            </>
        ) 
    }

    if (status === "success" && data.loggedIn) {
        return (
            <>
                <div className={styles.notificationIconContainer}>
                    <Image 
                        src={bell}
                        width={23}
                        height={26}
                        alt="notifications"
                        onClick={() => setShowNotifications(true)}
                        className={styles.bellImg}
                    />
                  
                </div>
                {showNotifications &&
                    <div className={styles.notificationsModuleContainer} ref={ref}>
                        <div className={styles.notificationsModule}>
                            No new notifications
                        </div>
                    </div>
                }
            </>
        )
    }

    return (
        <>
        <div className={styles.notificationIconContainer}>
            <Image 
                src={bell}
                width={23}
                height={26}
                alt="notifications"
                onClick={() => setShowNotifications(true)}
                className={styles.bellImg}
            />
            
        </div>
         {showNotifications &&
                <div className={styles.notificationsModuleContainer} ref={ref}>
                    <div className={styles.notificationsModule}>
                        <div className={styles.searchContainer}>
                                <p className={styles.searchText}>{`You'll get notified about new posts on your boards`}</p>
                            </div>
                            </div>
                </div>
            }
         </>
    )
}