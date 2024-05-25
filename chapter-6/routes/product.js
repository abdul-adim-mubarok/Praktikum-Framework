const product = require('../controller/product');
const router = require('express').Router();

router.get('/product', product.showAll);
router.get('/product/:id', product.showById);
router.post('/product', product.createProduct);
router.put('/product/:id', product.updateProduct);
router.delete('/product/:id', product.deleteProduct);
router.get('/product-favorit', product.productFavorit);
router.get('/product-kurang', product.productKurangDariLima);

module.exports = router;