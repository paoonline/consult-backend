/*
  Warnings:

  - Added the required column `device_token` to the `consult_notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consult_notification" ADD COLUMN     "device_token" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX "consult_notification_is_push_noti_idx" ON "consult_notification"("is_push_noti");
