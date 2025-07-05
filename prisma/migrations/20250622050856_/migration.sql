/*
  Warnings:

  - You are about to drop the column `deviceTokenId` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_deviceTokenId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "deviceTokenId",
ADD COLUMN     "device_token_id" TEXT;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_device_token_id_fkey" FOREIGN KEY ("device_token_id") REFERENCES "DeviceToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
