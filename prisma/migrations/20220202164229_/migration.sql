-- CreateTable
CREATE TABLE "FileDomain" (
    "id" SERIAL NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "FileDomain_pkey" PRIMARY KEY ("id")
);
