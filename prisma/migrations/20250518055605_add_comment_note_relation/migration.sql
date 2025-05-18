-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "note_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consult_transaction_id" TEXT NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "comment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rate" INTEGER NOT NULL,
    "consult_transaction_id" TEXT NOT NULL,
    "customer_detail_id" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "note_consult_transaction_id_key" ON "note"("consult_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_consult_transaction_id_key" ON "comment"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customer_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
