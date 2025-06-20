-- DropIndex
DROP INDEX "consult_transaction_customer_id_consult_id_idx";

-- CreateIndex
CREATE INDEX "consult_transaction_customer_id_idx" ON "consult_transaction"("customer_id");

-- CreateIndex
CREATE INDEX "consult_transaction_consult_id_idx" ON "consult_transaction"("consult_id");
