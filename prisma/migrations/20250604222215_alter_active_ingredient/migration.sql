/*
  Warnings:

  - You are about to drop the column `principioAtivoId` on the `Medicamento` table. All the data in the column will be lost.
  - You are about to drop the column `idPrincipioAtivo` on the `Promocao` table. All the data in the column will be lost.
  - You are about to drop the `PrincipioAtivo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[activeIngredientId]` on the table `Medicamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activeIngredientId]` on the table `Promocao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activeIngredientId` to the `Medicamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeIngredientId` to the `Promocao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicamento" DROP CONSTRAINT "Medicamento_principioAtivoId_fkey";

-- DropForeignKey
ALTER TABLE "Promocao" DROP CONSTRAINT "Promocao_idPrincipioAtivo_fkey";

-- DropIndex
DROP INDEX "Medicamento_principioAtivoId_key";

-- AlterTable
ALTER TABLE "Medicamento" DROP COLUMN "principioAtivoId",
ADD COLUMN     "activeIngredientId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Promocao" DROP COLUMN "idPrincipioAtivo",
ADD COLUMN     "activeIngredientId" UUID NOT NULL;

-- DropTable
DROP TABLE "PrincipioAtivo";

-- CreateTable
CREATE TABLE "ActiveIngredient" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idMedicamentoGenerico" UUID NOT NULL,
    "estoqueMin" INTEGER NOT NULL,
    "estoqueIdeal" INTEGER NOT NULL,
    "estoqueMax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicamento_activeIngredientId_key" ON "Medicamento"("activeIngredientId");

-- CreateIndex
CREATE UNIQUE INDEX "Promocao_activeIngredientId_key" ON "Promocao"("activeIngredientId");

-- AddForeignKey
ALTER TABLE "Medicamento" ADD CONSTRAINT "Medicamento_activeIngredientId_fkey" FOREIGN KEY ("activeIngredientId") REFERENCES "ActiveIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocao" ADD CONSTRAINT "Promocao_activeIngredientId_fkey" FOREIGN KEY ("activeIngredientId") REFERENCES "ActiveIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
