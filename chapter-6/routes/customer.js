const customer = require('../controller/customer');
const router = require('express').Router();

router.get('/customer', customer.showAll);
router.get('/customer/:id', customer.showById);
router.post('/customer', customer.createCustomer);
router.put('/customer/:id', customer.updateCustomer);
router.delete('/customer/:id', customer.deleteCustomer);
router.get('/total-pembelian', customer.totalPembelian);
router.get('/top-customer', customer.topCustomer);
router.get('/rata-rata-umur', customer.rataRataUmur);
router.get('/top-gender', customer.topGender)

module.exports = router;