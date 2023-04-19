-- AlterTable
ALTER TABLE "User" ADD COLUMN     "disableNotifications" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- CreateTable
CREATE TABLE "BookmarksByUser" (
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarksByUser_pkey" PRIMARY KEY ("boardId","userId")
);

-- AddForeignKey
ALTER TABLE "BookmarksByUser" ADD CONSTRAINT "BookmarksByUser_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarksByUser" ADD CONSTRAINT "BookmarksByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
