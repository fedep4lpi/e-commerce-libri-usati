-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Catalogo_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codiceisbn" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "prezzo" INTEGER NOT NULL,
    CONSTRAINT "Catalogo_libri_codiceisbn_fkey" FOREIGN KEY ("codiceisbn") REFERENCES "Adozione_libri" ("codiceisbn") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Catalogo_libri_id_fkey" FOREIGN KEY ("id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adozione_libri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codicescuola" TEXT NOT NULL,
    "annocorso" INTEGER NOT NULL,
    "sezioneanno" TEXT NOT NULL,
    "tipogradoscuola" TEXT NOT NULL,
    "combinazione" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "codiceisbn" TEXT NOT NULL,
    "autori" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "sottotitolo" TEXT,
    "volume" TEXT NOT NULL,
    "editore" TEXT NOT NULL,
    "prezzo" REAL NOT NULL,
    "nuovaadoz" BOOLEAN NOT NULL,
    "daacquist" BOOLEAN NOT NULL,
    "consigliato" TEXT NOT NULL,
    "regione" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Catalogo_libri_photo_url_key" ON "Catalogo_libri"("photo_url");

-- CreateIndex
CREATE UNIQUE INDEX "Adozione_libri_codiceisbn_key" ON "Adozione_libri"("codiceisbn");
