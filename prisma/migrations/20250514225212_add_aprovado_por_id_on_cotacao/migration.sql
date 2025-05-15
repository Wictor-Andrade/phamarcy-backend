-- AlterTable
ALTER TABLE "Cotacao" ADD COLUMN     "aprovadoPorId" TEXT;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_aprovadoPorId_fkey" FOREIGN KEY ("aprovadoPorId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
