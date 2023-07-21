const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: Object,
            ref: "User",
            required: true
        },
        price: {
            type: String,
            required: true
        },
        products: {
            type: [Object],
            ref: "Product",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);