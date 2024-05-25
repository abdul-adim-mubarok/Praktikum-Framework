const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaction = async (req, res, next) => {
    try {
        const { customer_id, detail_transaksi } = req.body;

        var total_pembelian = 0;
        for (const detail of detail_transaksi) {
            const product = await prisma.product.findUnique({
                where: {
                    kode_product: detail.product_id
                }
            });
            if (product) {
                total_pembelian += product.harga * (detail.jumlah || 1);
                await prisma.product.update({
                    where: {
                        kode_product: product.kode_product
                    },
                    data: {
                        stok: product.stok - detail.jumlah
                    }
                });
            }
        }

        const response = await prisma.transaction.create({
            data: {
                customer_id,
                total: total_pembelian,
                details: {
                    create: detail_transaksi.map(detail => ({
                        product_id: detail.product_id,
                        jumlah: detail.jumlah
                    }))
                }
            }
        });
        res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

const showAll = async (req, res, next) => {
    try {
        const response = await prisma.transaction.findMany({
            include: {
                customer: true,
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (response.length === 0) {
            res.status(400).json({
                status: false,
                message: 'data not found',
                data: response
            });
            return;
        }
        res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

const showById = async (req, res, next) => {
    try {
        const response = await prisma.transaction.findUnique({
            where: {
                kode_transaction: parseInt(req.params.id)
            },
            include: {
                customer: true,
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!response) {
            res.status(400).json({
                status: false,
                message: 'data not found',
                data: response
            });
            return;
        }
        res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

const updateTransaction = async (req, res, next) => {
    try {
        const { customer_id, detail_transaksi } = req.body;

        const transaksiLama = await prisma.transaction.findUnique({
            where: {
                kode_transaction: parseInt(req.params.id)
            },
            include: {
                details: true
            }
        });

        for (const detailLama of transaksiLama.details) {
            const product = await prisma.product.findUnique({
                where: {
                    kode_product: detailLama.product_id
                }
            });
            if (product) {
                await prisma.product.update({
                    where: {
                        kode_product: product.kode_product
                    },
                    data: {
                        stok: product.stok + detailLama.jumlah
                    }
                });
            }
        }

        var total_pembelian = 0;
        for (const detail of detail_transaksi) {
            const product = await prisma.product.findUnique({
                where: {
                    kode_product: detail.product_id
                }
            });
            if (product) {
                total_pembelian += product.harga * (detail.jumlah || 1);
                await prisma.product.update({
                    where: {
                        kode_product: product.kode_product
                    },
                    data: {
                        stok: product.stok - detail.jumlah
                    }
                });
            }
        }

        const response = await prisma.transaction.update({
            where: {
                kode_transaction: parseInt(req.params.id)
            },
            data: {
                customer_id,
                total: total_pembelian,
                details: {
                    deleteMany: {},
                    create: detail_transaksi.map(detail => ({
                        product_id: detail.product_id,
                        jumlah: detail.jumlah
                    }))
                }
            }
        });
        res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

const deleteTransaction = async (req, res, next) => {
    try {
        await prisma.detailTransaction.deleteMany({
            where: {
                transaction_id: parseInt(req.params.id)
            }
        });
        const response = await prisma.transaction.delete({
            where: {
                kode_transaction: parseInt(req.params.id)
            }
        });
        res.json({
            status: true,
            message: 'success',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTransaction, showAll, showById, updateTransaction, deleteTransaction
}