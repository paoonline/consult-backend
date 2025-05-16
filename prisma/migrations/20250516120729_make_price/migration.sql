/*
  Warnings:

  - You are about to drop the column `price` on the `customer_detail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "customer_detail" DROP COLUMN "price";
