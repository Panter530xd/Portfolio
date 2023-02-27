/*
  Warnings:

  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Heart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_postId_fkey";

-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "title",
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" TEXT,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Heart";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
