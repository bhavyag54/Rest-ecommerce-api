const User = require("../models/user")
const Catalog = require("../models/catalog")
const Item = require("../models/items")
const Order = require("../models/order")


exports.sellerRole = (req, res, next) => {
    req.role = 2;
    next();
}

exports.createCatalog = (req, res) => {

    const name = req.body.name
    const _id = req.authData._id

    const catalog = new Catalog({
        name,
        owner: _id
    })

    catalog.save((err, catalog) => {
        if(err)
            return res.status(400).json({
                error: "Unable to create catalog"
            })
        
            return res.status(200).json({
                message: "Success",
                catalog
            })
        
    })

}

exports.getOrders = async (req, res) => {

    const orders = await Order.find().where("seller_id").equals(req.authData._id);

    return res.status(200).json({
        orders: orders
    })

}

exports.createItem = (req, res) => {

    const catalog_id = req.params.catalog_id
    const owner_id = req.authData._id

    const {title, discription, price, quantity} = req.body;

    const item = new Item({
        title,
        discription,
        price,
        quantity,
        owner_id,
        catalog_id
    })

    item.save((err, item) => {
        if(err)
            return res.status(400).json({
                error: "Unable to list item"
            })

        return res.status(200).json({
            message: "success",
            item
        })
    })

    

}