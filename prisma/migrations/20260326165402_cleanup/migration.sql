/*
  Warnings:

  - You are about to drop the column `likes` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `postsP_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsP_id_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "likes",
DROP COLUMN "postsP_id",
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("p_id") ON DELETE CASCADE ON UPDATE CASCADE;
