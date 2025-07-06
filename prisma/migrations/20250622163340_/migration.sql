/*
  Warnings:

  - A unique constraint covering the columns `[consult_id,start_date]` on the table `consult_transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customer_id,start_date]` on the table `consult_transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "consult_transaction_consult_id_start_date_key" ON "consult_transaction"("consult_id", "start_date");

-- CreateIndex
CREATE UNIQUE INDEX "consult_transaction_customer_id_start_date_key" ON "consult_transaction"("customer_id", "start_date");
