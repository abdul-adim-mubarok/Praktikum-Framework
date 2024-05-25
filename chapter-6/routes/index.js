const router = require('express').Router();

const product = require('./product');
const customer = require('./customer');
const transaction = require('./transaction');
const dashboard = require('./dashboard');

router.use('/', product);
router.use('/', customer);
router.use('/', transaction);
router.use('/', dashboard);

module.exports = router;