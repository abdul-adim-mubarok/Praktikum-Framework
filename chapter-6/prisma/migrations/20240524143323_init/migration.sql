/*
  Warnings:

  - Added the required column `jumlah` to the `detailTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailtransaction` ADD COLUMN `jumlah` INTEGER NOT NULL;
