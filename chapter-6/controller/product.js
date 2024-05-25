const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showAll = async (_, res, next) => {
    try {
        const response = await prisma.product.findMany();

        if (response.length == 0) {
            return res.status(404).json({
                status: false,
                message: 'data not found',
                data: response
            });
        }

        return res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error)
    }
}

const showById = async (req, res, next) => {
    try {
        const response = await prisma.product.findUnique({
            where: {
                kode_product: parseInt(req.params.id)
            }
        });

        if (!response) {
            return res.status(404).json({
                status: false,
                message: 'data not found',
                data: response
            });
        }

        return res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const exist = await prisma.product.findFirst({
            where: {
                nama_product: req.body.nama_product
            }
        });

        if (exist) {
            return res.status(404).json({
                status: false,
                message: 'product already exist',
                data: exist
            });
        }

        const response = await prisma.product.create({
            data: {
                ...req.body
            }
        });

        return res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const response = await prisma.product.update({
            where: {
                kode_product: parseInt(req.params.id)
            },
            data: {
                ...req.body
            }
        });

        return res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const response = await prisma.product.delete({
            where: {
                kode_product: parseInt(req.params.id)
            }
        });

        return res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error)
    }
}

const productFavorit = async (req, res, next) => {
    try {
        const response = await prisma.product.findMany({
            include: {
                details: true
            }
        });
        const dataProduk = response.map(product => {
            const jumlahFrekuensi = product.details.length;
            const totalPembelian = product.details.reduce((sum, detail) => sum + (detail.jumlah * product.harga), 0);

            return {
                name: product.nama_product,
                jumlah_frekuensi: jumlahFrekuensi,
                total_pembelian: totalPembelian
            };
        }).sort((a, b) => b.jumlah_frekuensi - a.jumlah_frekuensi)[0];

        res.json({
            status: true,
            message: 'success',
            data: dataProduk
        });
    } catch (error) {
        next(error);
    }
}

const productKurangDariLima = async (req, res, next) => {
    try {
        const response = await prisma.product.findMany({
            where: {
                stok: {
                    lt: 5
                }
            },
            include: {
                details: true
            }
        });
        const produkDipilih = response.filter(product => product.details.length > 0);

        res.json({
            status: true,
            message: 'success',
            data: produkDipilih
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showAll, showById, createProduct, updateProduct, deleteProduct, productFavorit, productKurangDariLima
}