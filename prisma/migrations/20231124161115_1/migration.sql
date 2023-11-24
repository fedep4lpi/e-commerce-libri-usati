/*
  Warnings:

  - You are about to drop the column `username` on the `Catalogo_libri` table. All the data in the column will be lost.
  - Added the required column `email` to the `Catalogo_libri` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Adozione_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codicescuola" TEXT,
    "annocorso" INTEGER,
    "sezioneanno" TEXT,
    "tipogradoscuola" TEXT,
    "combinazione" TEXT,
    "codiceisbn" TEXT,
    "nuovaadoz" INTEGER,
    "daacquist" INTEGER,
    "consigliato" INTEGER,
    "regione" TEXT,
    CONSTRAINT "Adozione_libri_codiceisbn_fkey" FOREIGN KEY ("codiceisbn") REFERENCES "Isbn_libri" ("codiceisbn") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Isbn_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codiceisbn" TEXT,
    "autori" TEXT,
    "titolo" TEXT,
    "sottotitolo" TEXT,
    "disciplina" TEXT,
    "volume" TEXT,
    "editore" TEXT,
    "prezzo" REAL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Catalogo_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codiceisbn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "prezzo_usato" INTEGER NOT NULL,
    CONSTRAINT "Catalogo_libri_codiceisbn_fkey" FOREIGN KEY ("codiceisbn") REFERENCES "Isbn_libri" ("codiceisbn") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Catalogo_libri_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Catalogo_libri" ("codiceisbn", "id", "photo_url", "prezzo_usato") SELECT "codiceisbn", "id", "photo_url", "prezzo_usato" FROM "Catalogo_libri";
DROP TABLE "Catalogo_libri";
ALTER TABLE "new_Catalogo_libri" RENAME TO "Catalogo_libri";
CREATE UNIQUE INDEX "Catalogo_libri_photo_url_key" ON "Catalogo_libri"("photo_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Isbn_libri_1" ON "Isbn_libri"("codiceisbn");
Pragma writable_schema=0;
