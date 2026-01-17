/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `organizer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organizer" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_roleTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_roleTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE INDEX "_roleTouser_B_index" ON "_roleTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "organizer_userId_key" ON "organizer"("userId");

-- AddForeignKey
ALTER TABLE "organizer" ADD CONSTRAINT "organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roleTouser" ADD CONSTRAINT "_roleTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roleTouser" ADD CONSTRAINT "_roleTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
