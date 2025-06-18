-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT 'firstName',
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT 'lastName';
