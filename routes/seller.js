const express = require('express')
const { createItem, createCatalog, getOrders } = require('../controllers/seller')
const { verifyToken, verifyRole } = require('../controllers/user')
const router = express.Router()

router.post('/seller/create-catalog',[verifyToken, verifyRole], createCatalog)

router.get('/seller/orders',[verifyToken, verifyRole], getOrders)

router.post('/seller/:catalog_id/create-item', [verifyToken, verifyRole], createItem)

module.exports = router