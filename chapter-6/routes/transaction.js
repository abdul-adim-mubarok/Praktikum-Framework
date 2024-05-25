const transaction = require('../controller/transaction');
const router = require('express').Router();

router.get('/transaction', transaction.showAll);
router.get('/transaction/:id', transaction.showById);
router.post('/transaction', transaction.createTransaction);
router.put('/transaction/:id', transaction.updateTransaction);
router.delete('/transaction/:id', transaction.deleteTransaction);

module.exports = router;