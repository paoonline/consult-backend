-- DropForeignKey
ALTER TABLE "customer_detail" DROP CONSTRAINT "customer_detail_customer_id_fkey";

-- AddForeignKey
ALTER TABLE "customer_detail" ADD CONSTRAINT "customer_detail_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
