/*
  Warnings:

  - You are about to drop the column `clienteId` on the `NotaFiscalEletronica` table. All the data in the column will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotaFiscalEletronica" DROP CONSTRAINT "NotaFiscalEletronica_clienteId_fkey";

-- AlterTable
ALTER TABLE "NotaFiscalEletronica" DROP COLUMN "clienteId",
ADD COLUMN     "clientId" UUID;

-- DropTable
DROP TABLE "Cliente";

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpfCnpj_key" ON "Client"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "NotaFiscalEletronica" ADD CONSTRAINT "NotaFiscalEletronica_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
