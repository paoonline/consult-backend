/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_consult_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_customer_detail_id_fkey";

-- DropTable
DROP TABLE "comment";

-- CreateTable
CREATE TABLE "consult_comment" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "comment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rate" INTEGER NOT NULL,
    "consult_transaction_id" TEXT NOT NULL,
    "customer_detail_id" TEXT NOT NULL,

    CONSTRAINT "consult_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consult_comment_consult_transaction_id_key" ON "consult_comment"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "consult_comment" ADD CONSTRAINT "consult_comment_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consult_comment" ADD CONSTRAINT "consult_comment_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customer_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
