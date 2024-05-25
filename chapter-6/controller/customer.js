const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const showAll = async (_, res, next) => {
    try {
        const response = await prisma.customer.findMany();

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
        const response = await prisma.customer.findUnique({
            where: {
                id_customer: parseInt(req.params.id)
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

const createCustomer = async (req, res, next) => {
    try {
        const exist = await prisma.customer.findFirst({
            where: {
                nama_customer: req.body.nama_customer
            }
        });

        if (exist) {
            return res.status(404).json({
                status: false,
                message: 'customer already exist',
                data: exist
            });
        }

        const response = await prisma.customer.create({
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

const updateCustomer = async (req, res, next) => {
    try {
        const response = await prisma.customer.update({
            where: {
                id_customer: parseInt(req.params.id)
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

const deleteCustomer = async (req, res, next) => {
    try {
        const response = await prisma.customer.delete({
            where: {
                id_customer: parseInt(req.params.id)
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

const totalPembelian = async (req, res, next) => {
    try {
        const response = await prisma.customer.findMany({
            include: {
                orders: true
            }
        });
        const customerTransaksi = response.map(customer => {
            const totalPembelian = customer.orders.reduce((sum, order) => sum + order.total, 0);
            return {
                name: customer.nama_customer,
                total_pembelian: totalPembelian
            };
        });

        res.json({
            status: true,
            message: 'success',
            data: customerTransaksi
        });
    } catch (error) {
        next(error);
    }
}

const topCustomer = async (req, res, next) => {
    try {
        const response = await prisma.customer.findMany({
            include: {
                orders: {
                    include: {
                        details: true
                    }
                }
            }
        });
        const customerTotals = response.map(customer => {
            const totalPembelian = customer.orders.reduce((sum, order) => sum + order.total, 0);
            const totalItem = customer.orders.reduce((sum, order) =>
                sum + order.details.reduce((detailSum, detail) => detailSum + detail.jumlah, 0), 0);
            return {
                name: customer.nama_customer,
                jumlah_item: totalItem,
                total_pembelian: totalPembelian
            };
        });

        const customerTop = customerTotals.sort((a, b) => b.total_pembelian - a.total_pembelian).slice(0, 3);

        res.json({
            status: true,
            message: 'success',
            data: customerTop
        });
    } catch (error) {
        next(error);
    }
}

const rataRataUmur = async (req, res, next) => {
    try {
        const response = await prisma.customer.findMany({
            where: {
                orders: {
                    some: {}
                }
            },
            select: {
                umur: true
            }
        });
        const totalumur = response.reduce((sum, customer) => sum + customer.umur, 0);
        const rataUmur = response.length > 0 ? totalumur / response.length : 0;
        res.json({
            status: true,
            message: 'success',
            data: rataUmur
        });
    } catch (error) {
        next(error);
    }
}

const topGender = async (req, res, next) => {
    try {
        const response = await prisma.customer.groupBy({
            by: ['jenis_kelamin'],
            _count: {
                jenis_kelamin: true
            },
            orderBy: {
                _count: {
                    jenis_kelamin: 'desc'
                }
            },
            where: {
                orders: {
                    some: {}
                }
            }
        });
        const topJk = response[0];

        res.json({
            status: true,
            message: 'success',
            data: {
                jenis_kelamin: topJk.jenis_kelamin,
                frekunsi_pembelian: topJk._count.jenis_kelamin
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showAll, showById, createCustomer, updateCustomer, deleteCustomer, totalPembelian, topCustomer, rataRataUmur, topGender
}