/*
  Warnings:

  - You are about to drop the column `estoqueIdeal` on the `Medicamento` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueMax` on the `Medicamento` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueMin` on the `Medicamento` table. All the data in the column will be lost.
  - Added the required column `estoqueIdeal` to the `PrincipioAtivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoqueMax` to the `PrincipioAtivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoqueMin` to the `PrincipioAtivo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMovimento" AS ENUM ('ENTRADA', 'SAIDA');

-- AlterTable
ALTER TABLE "Medicamento" DROP COLUMN "estoqueIdeal",
DROP COLUMN "estoqueMax",
DROP COLUMN "estoqueMin";

-- AlterTable
ALTER TABLE "PrincipioAtivo" ADD COLUMN     "estoqueIdeal" INTEGER NOT NULL,
ADD COLUMN     "estoqueMax" INTEGER NOT NULL,
ADD COLUMN     "estoqueMin" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaFiscalEletronica" (
    "id" TEXT NOT NULL,
    "tipoMovimento" TEXT NOT NULL,
    "clienteId" TEXT,
    "fornecedorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotaFiscalEletronica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemNotaFiscalEletronica" (
    "id" TEXT NOT NULL,
    "notaFiscalEletronicaId" TEXT NOT NULL,
    "medicamentoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemNotaFiscalEletronica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComissaoNotaFiscalEletronica" (
    "id" TEXT NOT NULL,
    "notaFiscalEletronicaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComissaoNotaFiscalEletronica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstoqueMovimentacao" (
    "id" TEXT NOT NULL,
    "medicamentoId" TEXT NOT NULL,
    "itemNotaFiscalEletronicaId" TEXT NOT NULL,
    "tipoMovimento" "TipoMovimento" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "dataMovimentacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstoqueMovimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotacao" (
    "id" TEXT NOT NULL,
    "fornecedorId" TEXT NOT NULL,
    "ordemDeCompraId" TEXT NOT NULL,
    "valorFrete" DOUBLE PRECISION NOT NULL,
    "dataValidade" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCotacao" (
    "id" TEXT NOT NULL,
    "cotacaoId" TEXT NOT NULL,
    "medicamentoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "prazoEntregaDias" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCotacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfCnpj_key" ON "Cliente"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "ComissaoNotaFiscalEletronica_notaFiscalEletronicaId_key" ON "ComissaoNotaFiscalEletronica"("notaFiscalEletronicaId");

-- CreateIndex
CREATE UNIQUE INDEX "Cotacao_fornecedorId_ordemDeCompraId_key" ON "Cotacao"("fornecedorId", "ordemDeCompraId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCotacao_cotacaoId_medicamentoId_key" ON "ItemCotacao"("cotacaoId", "medicamentoId");

-- AddForeignKey
ALTER TABLE "NotaFiscalEletronica" ADD CONSTRAINT "NotaFiscalEletronica_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscalEletronica" ADD CONSTRAINT "NotaFiscalEletronica_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNotaFiscalEletronica" ADD CONSTRAINT "ItemNotaFiscalEletronica_notaFiscalEletronicaId_fkey" FOREIGN KEY ("notaFiscalEletronicaId") REFERENCES "NotaFiscalEletronica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNotaFiscalEletronica" ADD CONSTRAINT "ItemNotaFiscalEletronica_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComissaoNotaFiscalEletronica" ADD CONSTRAINT "ComissaoNotaFiscalEletronica_notaFiscalEletronicaId_fkey" FOREIGN KEY ("notaFiscalEletronicaId") REFERENCES "NotaFiscalEletronica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao" ADD CONSTRAINT "EstoqueMovimentacao_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao" ADD CONSTRAINT "EstoqueMovimentacao_itemNotaFiscalEletronicaId_fkey" FOREIGN KEY ("itemNotaFiscalEletronicaId") REFERENCES "ItemNotaFiscalEletronica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_ordemDeCompraId_fkey" FOREIGN KEY ("ordemDeCompraId") REFERENCES "OrdemDeCompra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCotacao" ADD CONSTRAINT "ItemCotacao_cotacaoId_fkey" FOREIGN KEY ("cotacaoId") REFERENCES "Cotacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCotacao" ADD CONSTRAINT "ItemCotacao_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
