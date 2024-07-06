-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_available_idx" ON "usuario"("available");
