/*
  Warnings:

  - You are about to drop the column `device_token_id` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_device_token_id_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "device_token_id";

-- CreateTable
CREATE TABLE "_NotificationToDeviceToken" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NotificationToDeviceToken_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NotificationToDeviceToken_B_index" ON "_NotificationToDeviceToken"("B");

-- AddForeignKey
ALTER TABLE "_NotificationToDeviceToken" ADD CONSTRAINT "_NotificationToDeviceToken_A_fkey" FOREIGN KEY ("A") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToDeviceToken" ADD CONSTRAINT "_NotificationToDeviceToken_B_fkey" FOREIGN KEY ("B") REFERENCES "DeviceToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
