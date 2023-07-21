const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        price: {
            type: String
        },
        available: {
            type: Boolean
        },
        unity: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);