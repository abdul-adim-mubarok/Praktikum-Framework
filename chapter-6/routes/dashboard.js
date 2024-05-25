const dashboard = require('../controller/dashboard');
const router = require('express').Router();

router.get('/', dashboard.dashboard);

module.exports = router;