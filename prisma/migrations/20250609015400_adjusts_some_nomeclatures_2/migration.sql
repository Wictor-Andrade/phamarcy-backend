/*
  Warnings:

  - You are about to drop the column `dosageStrength` on the `Medication` table. All the data in the column will be lost.
  - Added the required column `dosageAmount` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosageUnit` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DosageUnit" AS ENUM ('MG', 'G', 'MCG', 'ML', 'L', 'MG_ML', 'UNIDADE');

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "dosageStrength",
ADD COLUMN     "dosageAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dosageUnit" "DosageUnit" NOT NULL;
