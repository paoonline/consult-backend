-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "noti_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_push_noti" BOOLEAN NOT NULL DEFAULT false,
    "consult_transaction_id" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_consult_transaction_id_key" ON "notification"("consult_transaction_id");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_consult_transaction_id_fkey" FOREIGN KEY ("consult_transaction_id") REFERENCES "consult_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
