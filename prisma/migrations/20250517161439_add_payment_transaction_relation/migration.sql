-- CreateTable
CREATE TABLE "Payment_transaction" (
    "id" TEXT NOT NULL,
    "consult_id" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "consult_transaction_id" TEXT NOT NULL,

    CONSTRAINT "Payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_consult_transaction_id_key" ON "Payment_transaction"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "Payment_transaction" ADD CONSTRAINT "Payment_transaction_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
