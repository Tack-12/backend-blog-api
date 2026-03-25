-- CreateEnum
CREATE TYPE "View" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "privacy" "View" NOT NULL DEFAULT 'PUBLIC';
