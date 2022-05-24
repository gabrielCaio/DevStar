/*
  Warnings:

  - You are about to drop the column `authorId` on the `Video` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_authorId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
