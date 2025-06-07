/*
  Warnings:

  - You are about to drop the column `importance` on the `ActiveIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Medicamento` table. All the data in the column will be lost.
  - Added the required column `name` to the `Medicamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveIngredient" DROP COLUMN "importance";

-- AlterTable
ALTER TABLE "Medicamento" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;
