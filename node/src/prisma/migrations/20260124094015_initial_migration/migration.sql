/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `DayModifier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `DayModifier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayModifier" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DayModifier_code_key" ON "DayModifier"("code");
