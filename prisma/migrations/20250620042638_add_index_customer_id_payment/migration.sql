-- DropIndex
DROP INDEX "payment_transaction_customer_id_consult_id_idx";

-- CreateIndex
CREATE INDEX "payment_transaction_customer_id_idx" ON "payment_transaction"("customer_id");

-- CreateIndex
CREATE INDEX "payment_transaction_consult_id_idx" ON "payment_transaction"("consult_id");
