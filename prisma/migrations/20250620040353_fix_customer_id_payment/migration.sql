-- AlterTable
ALTER TABLE "payment_transaction" ADD COLUMN     "consultid_id" TEXT;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_consultid_id_fkey" FOREIGN KEY ("consultid_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
