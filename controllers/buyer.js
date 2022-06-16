const User = require("../models/user")
const Catalog = require("../models/catalog")
const Item = require("../models/items")
const Order = require("../models/order")


exports.buyerRole = (req, res, next) => {
    req.role = 1;
    next();
}


exports.getSellers = async (req, res) => {
    const sellers = await User.find().where('role').equals(2)
    
    const new_sellers = [];
    sellers.map(seller => {
        const {name, email, role, _id} = seller
        seller = {name, email, role, _id}
        new_sellers.push(seller)
    })

    return res.status(200).json({
        sellers: new_sellers
    })
}

exports.getCatalog = async (req, res) => {

    const {id} = req.params
    const seller = await User.findOne({_id:id})

    if(!seller)
        res.status(400).json({
            error: "error"
        })

    const catalogs = await Catalog.find().where("owner").equals(id)

    if(catalogs.length === 0)
        return res.status(400).json({
            message: "No Catalogs available"
        })

    return res.status(200).json({
        catalogs: catalogs
    })   
}

exports.getItems = async (req, res) => {

    const catalog_id = req.params.catalog_id;

    const items = await Item.find().where("catalog_id").equals(catalog_id)

    res.status(200).json({
        message: "success",
        items
    })

}

exports.createOrder = async (req, res) => {

    if(req.verifyTokenError)
    {
        return res.status(400).json({
            message: "Not Authorized"
        })
    }

    const seller_id = req.params.id
    const buyer_id = req.authData._id

    const items = req.body.items

    if(items.length === 0)
    {
        res.status(400).json({
            message: "No items selected"
        })
    }

    let _item;
    let new_items = [];

    let bill = 0;

    for(let item of items)
    {
        try{
            _item = await Item.findOne({_id:item._id})

            if(_item.quantity < item.quantity)
            {
                return res.status(400).json({
                    error: `Only ${_item.quatity} units of ${_item.title} left`
                })
            }
            
            bill += item.quantity*parseInt(_item.price)

            new_items.push({
                id: _item._id,
                quantity: item.quantity
            })
        }
        catch(err){
            return res.status(400).json({
                error: "Item not found"
            })
        }
    }

    const order = new Order({
        seller_id,
        buyer_id,
        items: new_items,
        bill
    })

    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Unable to place order"
            })
        }

        return res.status(200).json({
            message: "Success",
            order
        })
    }) 

}