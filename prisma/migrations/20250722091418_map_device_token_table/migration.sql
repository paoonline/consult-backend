/*
  Warnings:

  - You are about to drop the `DeviceToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeviceToken" DROP CONSTRAINT "DeviceToken_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationToDeviceToken" DROP CONSTRAINT "_NotificationToDeviceToken_B_fkey";

-- DropTable
DROP TABLE "DeviceToken";

-- CreateTable
CREATE TABLE "device_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "device_token_token_key" ON "device_token"("token");

-- AddForeignKey
ALTER TABLE "device_token" ADD CONSTRAINT "device_token_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToDeviceToken" ADD CONSTRAINT "_NotificationToDeviceToken_B_fkey" FOREIGN KEY ("B") REFERENCES "device_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
