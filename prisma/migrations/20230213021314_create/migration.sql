-- CreateTable
CREATE TABLE "Square" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,

    CONSTRAINT "Square_pkey" PRIMARY KEY ("id")
);
