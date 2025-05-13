-- CreateTable
CREATE TABLE "login" (
    "id" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,
    "login_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);
