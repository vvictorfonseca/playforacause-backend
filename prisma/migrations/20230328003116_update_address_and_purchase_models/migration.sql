/*
  Warnings:

  - Added the required column `cep` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "cep" TEXT NOT NULL,
ALTER COLUMN "number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
