/*
  Warnings:

  - A unique constraint covering the columns `[consult_transaction_id]` on the table `consult_notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consult_transaction_id` to the `consult_notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consult_notification" ADD COLUMN     "consult_transaction_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "consult_notification_consult_transaction_id_key" ON "consult_notification"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "consult_notification" ADD CONSTRAINT "consult_notification_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
