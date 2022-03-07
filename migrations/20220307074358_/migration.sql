/*
  Warnings:

  - Added the required column `type` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('SCHOOL', 'GRADE', 'HOMEROOM');

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "type" "VoteType" NOT NULL;
