/*
  Warnings:

  - You are about to drop the `customerDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_customer_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "customerDetail" DROP CONSTRAINT "customerDetail_customer_id_fkey";

-- DropTable
DROP TABLE "customerDetail";

-- CreateTable
CREATE TABLE "customer_detail" (
    "id" TEXT NOT NULL,
    "online_status" BOOLEAN NOT NULL DEFAULT false,
    "rate" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customer_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_detail_customer_id_key" ON "customer_detail"("customer_id");

-- AddForeignKey
ALTER TABLE "customer_detail" ADD CONSTRAINT "customer_detail_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customer_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
