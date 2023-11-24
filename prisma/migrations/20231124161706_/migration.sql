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
    "email" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "prezzo_usato" INTEGER NOT NULL,
    CONSTRAINT "Catalogo_libri_codiceisbn_fkey" FOREIGN KEY ("codiceisbn") REFERENCES "Isbn_libri" ("codiceisbn") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Catalogo_libri_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE NO ACTION ON UPDATE NO ACTION
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Catalogo_libri_photo_url_key" ON "Catalogo_libri"("photo_url");

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Isbn_libri_1" ON "Isbn_libri"("codiceisbn");
Pragma writable_schema=0;
