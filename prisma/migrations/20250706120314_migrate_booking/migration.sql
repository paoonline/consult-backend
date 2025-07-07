/*
  Warnings:

  - Added the required column `consult_transaction_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "consult_transaction_id" TEXT NOT NULL;
