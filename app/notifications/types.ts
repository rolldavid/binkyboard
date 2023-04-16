export interface NotificationProps {
    notification: string;
    name: string | boolean;
    slug: string | boolean;
    createdAt: Date;
    notificationId: number;
    sender: string | null
}