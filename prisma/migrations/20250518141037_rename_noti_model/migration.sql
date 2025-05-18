/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_consult_transaction_id_fkey";

-- DropTable
DROP TABLE "notification";

-- CreateTable
CREATE TABLE "consult_notification" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "noti_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_push_noti" BOOLEAN NOT NULL DEFAULT false,
    "consult_transaction_id" TEXT NOT NULL,

    CONSTRAINT "consult_notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consult_notification_consult_transaction_id_key" ON "consult_notification"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "consult_notification" ADD CONSTRAINT "consult_notification_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
