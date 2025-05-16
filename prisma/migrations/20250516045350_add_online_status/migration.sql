/*
  Warnings:

  - You are about to drop the column `online_status` on the `customer_detail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "online_status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "customer_detail" DROP COLUMN "online_status";
