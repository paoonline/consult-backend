/*
  Warnings:

  - You are about to drop the `consult_notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "consult_notification" DROP CONSTRAINT "consult_notification_consult_transaction_id_fkey";

-- DropTable
DROP TABLE "consult_notification";

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "noti_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_push_noti" BOOLEAN NOT NULL DEFAULT false,
    "consult_transaction_id" TEXT NOT NULL,
    "device_token" VARCHAR(100) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_consult_transaction_id_key" ON "notification"("consult_transaction_id");

-- CreateIndex
CREATE INDEX "notification_is_push_noti_idx" ON "notification"("is_push_noti");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
