-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsP_id_fkey";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsP_id_fkey" FOREIGN KEY ("postsP_id") REFERENCES "Posts"("p_id") ON DELETE CASCADE ON UPDATE CASCADE;
