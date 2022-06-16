const express = require('express')
const { getSellers, getCatalog, createOrder, getItems } = require('../controllers/buyer')
const {verifyToken, verifyRole} = require('../controllers/user')
const router = express.Router()


router.get('/buyer/list-of-sellers', getSellers)

router.get(`/buyer/seller-catalog/:id`,[verifyToken, verifyRole], getCatalog)

router.post(`/buyer/create-order/:id`, [verifyToken, verifyRole], createOrder)

router.get(`/buyer/:catalog_id/items`, [verifyToken, verifyRole], getItems)

module.exports = router

