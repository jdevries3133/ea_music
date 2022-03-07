/*
  Warnings:

  - You are about to drop the column `voter_name` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `voterId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "voter_name",
ADD COLUMN     "voterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
