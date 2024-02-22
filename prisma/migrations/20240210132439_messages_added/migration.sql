-- CreateTable
CREATE TABLE "Messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sendedat" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Messages_sender_fkey" FOREIGN KEY ("sender") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Messages_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
