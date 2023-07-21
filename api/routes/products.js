const router = require("express").Router();
const Product = require("../models/Product");


// Create
router.post("/", async(req,res) => {
    try{
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            unity: req.body.unity,
            available: req.body.available
        })
        const product = await newProduct.save();
        res.status(200).json(product);
    }catch(err) {
        res.status(500).json(err)
    }
});

// Update
router.put("/:id", async(req,res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true});
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status(500).json(err)
        }
});

// Delete
router.delete("/:id", async(req,res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted");
        }catch(err){
            res.status(500).json(err)
        }
});

// Get product
router.get("/:id", async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json("Product not found");
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

// Get all products
router.get("/", async(req,res) => {
    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(400).json("Product not found");
        }
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;