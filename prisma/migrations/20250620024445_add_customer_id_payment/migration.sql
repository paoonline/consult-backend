/*
  Warnings:

  - A unique constraint covering the columns `[customer_id]` on the table `payment_transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payment_transaction" ADD COLUMN     "customer_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_customer_id_key" ON "payment_transaction"("customer_id");

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
