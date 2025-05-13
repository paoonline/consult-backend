-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('CONSULT', 'CUSTOMER');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "job" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "skill" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "customer_type" "CustomerType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_image" VARCHAR(100) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDetail" (
    "id" TEXT NOT NULL,
    "online_status" BOOLEAN NOT NULL DEFAULT false,
    "rate" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "book_time" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "CustomerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDetail_customer_id_key" ON "CustomerDetail"("customer_id");

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD CONSTRAINT "CustomerDetail_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
