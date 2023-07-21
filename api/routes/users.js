const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log({authHeader})
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("User not authenticated")
    }
}

// Update
router.put("/:id", async(req,res) => {
    if(req.body.userId == req.params.id) {
            if(req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("Invalid id")
    }
})

// Delete
router.delete("/:id", verify, async(req,res) => {
    console.log({user: req.user})
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("Invalid id or not allowed")
    }
});

// Get user
router.get("/:id", async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        } else {
            res.status(400).json("Invalid user");
        }
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router;