/*
  Warnings:

  - You are about to drop the column `notaFiscalEletronicaId` on the `ComissaoNotaFiscalEletronica` table. All the data in the column will be lost.
  - You are about to drop the column `itemNotaFiscalEletronicaId` on the `EstoqueMovimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `EstoqueMovimentacao` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `ItemCotacao` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `ItemNotaFiscalEletronica` table. All the data in the column will be lost.
  - You are about to drop the column `notaFiscalEletronicaId` on the `ItemNotaFiscalEletronica` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedorId` on the `MedicamentoFornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `MedicamentoFornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `OrdemDeCompraItem` table. All the data in the column will be lost.
  - You are about to drop the `Medicamento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idNotaFiscalEletronica]` on the table `ComissaoNotaFiscalEletronica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cotacaoId,idMedication]` on the table `ItemCotacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMedication,idFornecedor]` on the table `MedicamentoFornecedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idNotaFiscalEletronica` to the `ComissaoNotaFiscalEletronica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idItemNotaFiscalEletronica` to the `EstoqueMovimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMedication` to the `EstoqueMovimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMedication` to the `ItemCotacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMedicamento` to the `ItemNotaFiscalEletronica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNotaFiscalEletronica` to the `ItemNotaFiscalEletronica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idFornecedor` to the `MedicamentoFornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMedication` to the `MedicamentoFornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMedication` to the `OrdemDeCompraItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DosageForm" AS ENUM ('COMPRIMIDO', 'CAPSULA', 'SOLUCAO', 'POMADA', 'INJETAVEL', 'OUTRO');

-- DropForeignKey
ALTER TABLE "ComissaoNotaFiscalEletronica" DROP CONSTRAINT "ComissaoNotaFiscalEletronica_notaFiscalEletronicaId_fkey";

-- DropForeignKey
ALTER TABLE "EstoqueMovimentacao" DROP CONSTRAINT "EstoqueMovimentacao_itemNotaFiscalEletronicaId_fkey";

-- DropForeignKey
ALTER TABLE "EstoqueMovimentacao" DROP CONSTRAINT "EstoqueMovimentacao_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCotacao" DROP CONSTRAINT "ItemCotacao_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "ItemNotaFiscalEletronica" DROP CONSTRAINT "ItemNotaFiscalEletronica_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "ItemNotaFiscalEletronica" DROP CONSTRAINT "ItemNotaFiscalEletronica_notaFiscalEletronicaId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamento" DROP CONSTRAINT "Medicamento_activeIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicamentoFornecedor" DROP CONSTRAINT "MedicamentoFornecedor_fornecedorId_fkey";

-- DropForeignKey
ALTER TABLE "MedicamentoFornecedor" DROP CONSTRAINT "MedicamentoFornecedor_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "OrdemDeCompraItem" DROP CONSTRAINT "OrdemDeCompraItem_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "Promocao" DROP CONSTRAINT "Promocao_idMedicamento_fkey";

-- DropIndex
DROP INDEX "ComissaoNotaFiscalEletronica_notaFiscalEletronicaId_key";

-- DropIndex
DROP INDEX "ItemCotacao_cotacaoId_medicamentoId_key";

-- DropIndex
DROP INDEX "MedicamentoFornecedor_medicamentoId_fornecedorId_key";

-- AlterTable
ALTER TABLE "ComissaoNotaFiscalEletronica" DROP COLUMN "notaFiscalEletronicaId",
ADD COLUMN     "idNotaFiscalEletronica" UUID NOT NULL;

-- AlterTable
ALTER TABLE "EstoqueMovimentacao" DROP COLUMN "itemNotaFiscalEletronicaId",
DROP
COLUMN "medicamentoId",
ADD COLUMN     "idItemNotaFiscalEletronica" UUID NOT NULL,
ADD COLUMN     "idMedication" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ItemCotacao" DROP COLUMN "medicamentoId",
ADD COLUMN     "idMedication" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ItemNotaFiscalEletronica" DROP COLUMN "medicamentoId",
DROP
COLUMN "notaFiscalEletronicaId",
ADD COLUMN     "idMedicamento" UUID NOT NULL,
ADD COLUMN     "idNotaFiscalEletronica" UUID NOT NULL;

-- AlterTable
ALTER TABLE "MedicamentoFornecedor" DROP COLUMN "fornecedorId",
DROP
COLUMN "medicamentoId",
ADD COLUMN     "idFornecedor" UUID NOT NULL,
ADD COLUMN     "idMedication" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OrdemDeCompraItem" DROP COLUMN "medicamentoId",
ADD COLUMN     "idMedication" UUID NOT NULL;

-- DropTable
DROP TABLE "Medicamento";

-- CreateTable
CREATE TABLE "Medication"
(
    "id"                 UUID         NOT NULL,
    "name"               TEXT         NOT NULL,
    "activeIngredientId" UUID         NOT NULL,
    "origin"             "OriginType" NOT NULL,
    "dosageForm"         "DosageForm" NOT NULL,
    "dosageStrength"     TEXT         NOT NULL,
    "imageUrl"           TEXT,
    "createdAt"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"          TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medication_activeIngredientId_key" ON "Medication" ("activeIngredientId");

-- CreateIndex
CREATE UNIQUE INDEX "ComissaoNotaFiscalEletronica_idNotaFiscalEletronica_key" ON "ComissaoNotaFiscalEletronica" ("idNotaFiscalEletronica");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCotacao_cotacaoId_idMedication_key" ON "ItemCotacao" ("cotacaoId", "idMedication");

-- CreateIndex
CREATE UNIQUE INDEX "MedicamentoFornecedor_idMedication_idFornecedor_key" ON "MedicamentoFornecedor" ("idMedication", "idFornecedor");

-- AddForeignKey
ALTER TABLE "Medication"
    ADD CONSTRAINT "Medication_activeIngredientId_fkey" FOREIGN KEY ("activeIngredientId") REFERENCES "ActiveIngredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemDeCompraItem"
    ADD CONSTRAINT "OrdemDeCompraItem_idMedication_fkey" FOREIGN KEY ("idMedication") REFERENCES "Medication" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocao"
    ADD CONSTRAINT "Promocao_idMedicamento_fkey" FOREIGN KEY ("idMedicamento") REFERENCES "Medication" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicamentoFornecedor"
    ADD CONSTRAINT "MedicamentoFornecedor_idMedication_fkey" FOREIGN KEY ("idMedication") REFERENCES "Medication" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicamentoFornecedor"
    ADD CONSTRAINT "MedicamentoFornecedor_idFornecedor_fkey" FOREIGN KEY ("idFornecedor") REFERENCES "Fornecedor" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNotaFiscalEletronica"
    ADD CONSTRAINT "ItemNotaFiscalEletronica_idNotaFiscalEletronica_fkey" FOREIGN KEY ("idNotaFiscalEletronica") REFERENCES "NotaFiscalEletronica" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNotaFiscalEletronica"
    ADD CONSTRAINT "ItemNotaFiscalEletronica_idMedicamento_fkey" FOREIGN KEY ("idMedicamento") REFERENCES "Medication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComissaoNotaFiscalEletronica"
    ADD CONSTRAINT "ComissaoNotaFiscalEletronica_idNotaFiscalEletronica_fkey" FOREIGN KEY ("idNotaFiscalEletronica") REFERENCES "NotaFiscalEletronica" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao"
    ADD CONSTRAINT "EstoqueMovimentacao_idMedication_fkey" FOREIGN KEY ("idMedication") REFERENCES "Medication" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao"
    ADD CONSTRAINT "EstoqueMovimentacao_idItemNotaFiscalEletronica_fkey" FOREIGN KEY ("idItemNotaFiscalEletronica") REFERENCES "ItemNotaFiscalEletronica" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCotacao"
    ADD CONSTRAINT "ItemCotacao_idMedication_fkey" FOREIGN KEY ("idMedication") REFERENCES "Medication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
