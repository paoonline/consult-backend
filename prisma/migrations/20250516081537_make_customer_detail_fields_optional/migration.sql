-- CreateEnum
CREATE TYPE "TimeLimitType" AS ENUM ('ONE_HR', 'TWO_HR');

-- AlterTable
ALTER TABLE "customer_detail" ALTER COLUMN "rate" DROP NOT NULL,
ALTER COLUMN "rate" SET DEFAULT 0,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0.00;

-- CreateTable
CREATE TABLE "consult_transaction" (
    "id" TEXT NOT NULL,
    "customer_id" VARCHAR(100) NOT NULL,
    "consult_id" VARCHAR(100) NOT NULL,
    "time_list" "TimeLimitType" NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consult_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consult_transaction" ADD CONSTRAINT "consult_transaction_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consult_transaction" ADD CONSTRAINT "consult_transaction_consult_id_fkey" FOREIGN KEY ("consult_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
