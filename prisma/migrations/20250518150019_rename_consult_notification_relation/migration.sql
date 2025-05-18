/*
  Warnings:

  - You are about to drop the column `consult_transaction_id` on the `consult_notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "consult_notification" DROP CONSTRAINT "consult_notification_consult_transaction_id_fkey";

-- DropIndex
DROP INDEX "consult_notification_consult_transaction_id_key";

-- AlterTable
ALTER TABLE "consult_notification" DROP COLUMN "consult_transaction_id";
