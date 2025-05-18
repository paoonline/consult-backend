/*
  Warnings:

  - You are about to drop the `Payment_transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment_transaction" DROP CONSTRAINT "Payment_transaction_consult_transaction_id_fkey";

-- DropTable
DROP TABLE "Payment_transaction";

-- CreateTable
CREATE TABLE "payment_transaction" (
    "id" TEXT NOT NULL,
    "consult_id" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "consult_transaction_id" TEXT NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_consult_transaction_id_key" ON "payment_transaction"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
