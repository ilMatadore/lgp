const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema(
    {
        products: {
            type: [Object],
            ref: "Product",
            required: true
        },
        price: {
            type: String,
            required: true
        },
        name: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Basket", BasketSchema);