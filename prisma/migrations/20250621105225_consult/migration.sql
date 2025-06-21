-- CreateIndex
CREATE INDEX "customer_customer_type_idx" ON "customer"("customer_type");

-- CreateIndex
CREATE INDEX "customer_detail_customer_id_idx" ON "customer_detail"("customer_id");
