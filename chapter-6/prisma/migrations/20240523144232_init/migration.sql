/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `harga` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `id_customer` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_customer` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_product` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_product` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `nama`,
    ADD COLUMN `id_customer` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nama_customer` VARCHAR(40) NOT NULL,
    ADD PRIMARY KEY (`id_customer`);

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    DROP COLUMN `kode`,
    DROP COLUMN `nama`,
    ADD COLUMN `kode_product` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nama_product` VARCHAR(20) NOT NULL,
    MODIFY `harga` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`kode_product`);

-- CreateTable
CREATE TABLE `transaction` (
    `kode_transaction` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`kode_transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detailTransaction` (
    `id_detailTransaction` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_detailTransaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id_customer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaction` ADD CONSTRAINT `detailTransaction_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`kode_transaction`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaction` ADD CONSTRAINT `detailTransaction_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`kode_product`) ON DELETE RESTRICT ON UPDATE CASCADE;
