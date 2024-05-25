-- CreateTable
CREATE TABLE `product` (
    `kode` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(20) NOT NULL,
    `harga` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,

    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(40) NOT NULL,
    `alamat` TEXT NOT NULL,
    `jenis_kelamin` VARCHAR(10) NOT NULL,
    `umur` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
