const router = require("express").Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { sendOrderConfirmation} = require('../mail');

router.post("/", async(req,res) => {
    const { userCtx, cartCtx } = req.body;
    try{
        const newOrder = new Order({
            user: userCtx,
            price: cartCtx.cartTotal,
            products: cartCtx.cartItems
        })
        const order = await newOrder.save();
        res.status(200).json(order);
    }catch(err) {
        res.status(500).json(err)
    }
});

router.get("/:id", async(req,res) => {
    try {
        const orders = await Order.find({
            'user.id': req.params.id
        })
        if (orders) {
            res.status(200).json(orders)
        } else {
            res.status(400).json("Order not found");
        }
    } catch(err) {
        res.status(400).json('Error retrieving orders for user' + err);
    }
});

router.post("/confirmation", (req, res) => {
    const { user, cart, order } = req.body;
  
    sendOrderConfirmation(user, cart, order, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error", err: err });
      } else {
        res.status(200).json({ message: "Su mensaje ha sido enviado!", data: data });
      }
    });
})


module.exports = router;