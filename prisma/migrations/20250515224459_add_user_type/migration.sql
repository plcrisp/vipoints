-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'SELLER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'CLIENT';
