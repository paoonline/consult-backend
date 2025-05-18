/*
  Warnings:

  - You are about to drop the column `price` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "customer_detail" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
