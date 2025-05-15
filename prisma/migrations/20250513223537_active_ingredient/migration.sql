-- CreateTable
CREATE TABLE "ActiveIngredient" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "minimumQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveIngredient_pkey" PRIMARY KEY ("id")
);
