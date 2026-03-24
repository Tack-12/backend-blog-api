/*
  Warnings:

  - You are about to drop the column `mainComment` on the `Comments` table. All the data in the column will be lost.
  - Made the column `postsP_id` on table `Comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_mainComment_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsP_id_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "mainComment",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "postsP_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsP_id_fkey" FOREIGN KEY ("postsP_id") REFERENCES "Posts"("p_id") ON DELETE RESTRICT ON UPDATE CASCADE;
