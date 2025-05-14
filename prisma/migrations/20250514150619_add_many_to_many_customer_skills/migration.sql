/*
  Warnings:

  - You are about to drop the column `skill` on the `Customer` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "skill",
ALTER COLUMN "password" SET DATA TYPE VARCHAR(20);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CustomerToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "_CustomerToSkill_B_index" ON "_CustomerToSkill"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToSkill" ADD CONSTRAINT "_CustomerToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSkill" ADD CONSTRAINT "_CustomerToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
