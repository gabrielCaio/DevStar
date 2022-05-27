-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "hasThumbnail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qntComments" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "hasAvatar" BOOLEAN NOT NULL DEFAULT false;
