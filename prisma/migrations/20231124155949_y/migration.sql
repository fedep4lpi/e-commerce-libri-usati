-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Catalogo_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codiceisbn" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "prezzo_usato" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Catalogo_libri_photo_url_key" ON "Catalogo_libri"("photo_url");
