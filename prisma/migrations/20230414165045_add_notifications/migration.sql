-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationActive" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,
    "sender" TEXT,
    "boardId" TEXT,

    CONSTRAINT "NotificationActive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationComplete" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationId" INTEGER NOT NULL,
    "sender" TEXT,
    "boardId" TEXT,

    CONSTRAINT "NotificationComplete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NotificationActiveToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NotificationCompleteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationActiveToUser_AB_unique" ON "_NotificationActiveToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationActiveToUser_B_index" ON "_NotificationActiveToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationCompleteToUser_AB_unique" ON "_NotificationCompleteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationCompleteToUser_B_index" ON "_NotificationCompleteToUser"("B");

-- AddForeignKey
ALTER TABLE "NotificationActive" ADD CONSTRAINT "NotificationActive_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationActive" ADD CONSTRAINT "NotificationActive_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationComplete" ADD CONSTRAINT "NotificationComplete_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationComplete" ADD CONSTRAINT "NotificationComplete_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationActiveToUser" ADD CONSTRAINT "_NotificationActiveToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NotificationActive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationActiveToUser" ADD CONSTRAINT "_NotificationActiveToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationCompleteToUser" ADD CONSTRAINT "_NotificationCompleteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NotificationComplete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationCompleteToUser" ADD CONSTRAINT "_NotificationCompleteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
