-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('SCHOOL', 'GRADE', 'HOMEROOM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "voterId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "VoteType" NOT NULL,
    "winner" TEXT NOT NULL,
    "loser" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RudimentUnlocked" (
    "id" SERIAL NOT NULL,
    "rudimentId" INTEGER NOT NULL,
    "homeroom" TEXT NOT NULL,

    CONSTRAINT "RudimentUnlocked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentName_key" ON "User"("studentName");

-- CreateIndex
CREATE UNIQUE INDEX "RudimentUnlocked_rudimentId_homeroom_key" ON "RudimentUnlocked"("rudimentId", "homeroom");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
