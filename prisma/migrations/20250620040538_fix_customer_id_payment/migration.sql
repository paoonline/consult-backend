/*
  Warnings:

  - You are about to drop the column `consultid_id` on the `payment_transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment_transaction" DROP CONSTRAINT "payment_transaction_consultid_id_fkey";

-- AlterTable
ALTER TABLE "payment_transaction" DROP COLUMN "consultid_id",
ADD COLUMN     "consult_id" TEXT;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_consult_id_fkey" FOREIGN KEY ("consult_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
