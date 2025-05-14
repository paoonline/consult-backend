/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customer_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerDetail" DROP CONSTRAINT "CustomerDetail_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToSkill" DROP CONSTRAINT "_CustomerToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToSkill" DROP CONSTRAINT "_CustomerToSkill_B_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "CustomerDetail";

-- DropTable
DROP TABLE "Skill";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "job" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "customer_type" "CustomerType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_image" VARCHAR(255),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerDetail" (
    "id" TEXT NOT NULL,
    "online_status" BOOLEAN NOT NULL DEFAULT false,
    "rate" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "customer_detail_id" TEXT NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "skill_name_key" ON "skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customerDetail_customer_id_key" ON "customerDetail"("customer_id");

-- AddForeignKey
ALTER TABLE "customerDetail" ADD CONSTRAINT "customerDetail_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customerDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSkill" ADD CONSTRAINT "_CustomerToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSkill" ADD CONSTRAINT "_CustomerToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
