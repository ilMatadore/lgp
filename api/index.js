const express = require('express');
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");
const basketsRoute = require("./routes/baskets");
const ordersRoute = require("./routes/orders");
const contactRoute = require("./routes/contact");
const multer = require("multer");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to Mongo.."))
.catch((err) => console.log(err));

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // test.jpg if testing in postamn
    } 
});

const upload = multer({storage})

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})



app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/baskets", basketsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/contact", contactRoute);



app.listen("5000", () => {
    console.log("backend running...")
});