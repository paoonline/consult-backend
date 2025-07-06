-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_consult_transaction_id_fkey";

-- CreateTable
CREATE TABLE "_BookingToConsultTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookingToConsultTransaction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookingToConsultTransaction_B_index" ON "_BookingToConsultTransaction"("B");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToConsultTransaction" ADD CONSTRAINT "_BookingToConsultTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToConsultTransaction" ADD CONSTRAINT "_BookingToConsultTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "consult_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
