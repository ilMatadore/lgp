const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./users");

const generateAccessToken = user => jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY, {expiresIn: '15m'});
const generateRefreshToken = user => jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_REFRESH_SECRET_KEY);
let refreshTokens = [];

//Register
router.post("/register", async(req,res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPass, 
            isAdmin: req.body.isAdmin
        })

        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({
            email
        })
        if (user) {
            const validated = await bcrypt.compare(password, user.password);
            if (validated) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                refreshTokens.push(refreshToken)
                const { password, ...others } = user._doc
                res.status(200).json({others, accessToken, refreshToken});
            } else {
                res.status(400).json("Wrong credentials");
            }
        } else {
            res.status(400).json("Wrong credentials");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken )
    res.status(200).json("You have been logged out successfully")
})

router.post("/refresh", (req, res) => {
    const refreshToken = req.body.token;
    console.log({refreshTokens})
    if(!refreshToken) {
        return res.status(401).json("You are not authenticated")
    }
    if(!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
        console.log({user})
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
})


module.exports = router;