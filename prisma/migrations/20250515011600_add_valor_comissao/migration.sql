/*
  Warnings:

  - Added the required column `valorComissao` to the `ComissaoNotaFiscalEletronica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComissaoNotaFiscalEletronica" ADD COLUMN     "valorComissao" DOUBLE PRECISION NOT NULL;
