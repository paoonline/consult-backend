/*
  Warnings:

  - You are about to drop the column `book_time` on the `CustomerDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerDetail" DROP COLUMN "book_time";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "customer_detail_id" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "CustomerDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
