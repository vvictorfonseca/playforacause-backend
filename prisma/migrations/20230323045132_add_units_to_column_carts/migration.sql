/*
  Warnings:

  - Added the required column `units` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "units" INTEGER NOT NULL;
