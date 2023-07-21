const router = require("express").Router();
const Product = require("../models/Product");
const Basket = require("../models/Basket");


// Create
router.post("/", async(req,res) => {
    const productsId = req.body.products;
    // const doc = await Parent.findOne().populate('child');
    const products = await Product.find({
        '_id': { $in: productsId}
    })
    console.log({productsId, products})
    try{
        const newBasket = new Basket({
            products,
            price: req.body.price,
            name: req.body.name
        })
        const basket = await newBasket.save();
        res.status(200).json(basket);
    }catch(err) {
        res.status(500).json(err)
    }
});

// Update
router.put("/:id", async(req,res) => {
    const productsId = req.body.products;
    const para = req.params.id;
    const products = await Product.find({
        '_id': { $in: productsId}
    })
    const {price, name} = req.body;
    const tete = await Product.findById(req.params.id)
        try {
            const updatedBasket = await Basket.findByIdAndUpdate(req.params.id, {
                products,
                price,
                name
            },{new: true});
            res.status(200).json(updatedBasket);
        }catch(err){
            res.status(500).json(err)
        }
});

// Delete
router.delete("/:id", async(req,res) => {
        try {
            await Basket.findByIdAndDelete(req.params.id);
            res.status(200).json("Basket has been deleted");
        }catch(err){
            res.status(500).json(err)
        }
});

// Get basket
router.get("/:id", async(req,res) => {
    try {
        const basket = await Basket.findById(req.params.id);
        if (basket) {
            res.status(200).json(basket);
        } else {
            res.status(400).json("Basket not found");
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

async function getProds(prodsIds) {
    const a = await prodsIds.map(prod => prod.toString())
    return a;
}

// Get all baskets
router.get("/", async(req,res) => {
    try {
        const baskets = await Basket.find();
        if (baskets) {
            res.status(200).json(baskets);
        } else {
            res.status(400).json("Baskets not found");
        }
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;