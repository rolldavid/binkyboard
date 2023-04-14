import { NotificationProps } from "../types"
import Link from "next/link";
import styles from './Notification.module.css';

export default function Notifications({ notification, status }: { notification: NotificationProps, status: "new" | "complete" }) {
    if (status === "new") {
        if (notification.notificationId === 1) {
            return (
                
                    <p className={styles.newNotification}>{notification.notification} for {notification.name}</p>
              
            )
        }

        if (notification.notificationId === 2) {
            return (
                
                    <p className={styles.newNotification}>{notification.notification} for {notification.name}</p>
           
            )
        }
    } else {
        if (notification.notificationId === 1 || notification.notificationId === 2) {
            return (
                
                    <p className={styles.recentNotification}>{notification.notification} for {notification.name}</p>
               
            )
        }
    }
    
    return null;
}