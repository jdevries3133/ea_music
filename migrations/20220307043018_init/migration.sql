/*
  Warnings:

  - You are about to drop the column `browserFingerprint` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "browserFingerprint";

-- CreateIndex
CREATE UNIQUE INDEX "User_studentName_key" ON "User"("studentName");
