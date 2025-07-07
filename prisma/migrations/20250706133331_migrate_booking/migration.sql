/*
  Warnings:

  - You are about to drop the `_BookingToConsultTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookingToConsultTransaction" DROP CONSTRAINT "_BookingToConsultTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToConsultTransaction" DROP CONSTRAINT "_BookingToConsultTransaction_B_fkey";

-- DropForeignKey
ALTER TABLE "payment_transaction" DROP CONSTRAINT "payment_transaction_consult_transaction_id_fkey";

-- DropTable
DROP TABLE "_BookingToConsultTransaction";

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
