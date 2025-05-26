const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8001;
const routes = require("./routes/url");
const userRoutes=require("./routes/user")
const staticRoute=require("./routes/staticRouter")
const path = require("path");
const methodOverride = require('method-override');
const {restrictToLoginUserOnly}=require("./Middlewares/userMiddlewares")
const cookieParser = require("cookie-parser");

//settiing views for webpage

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Mongo-db Connection

mongoose.connect("mongodb://127.0.0.1:27017/UrlWebsite")
    .then(() => { console.log(("Connected MongoDB")) })
    .catch((err) => { console.log("error:", err) });

//middle wares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/url",restrictToLoginUserOnly,routes);
app.use("/",staticRoute)
app.use("/user",userRoutes);

//running server
app.listen(PORT, () => { console.log("Server started at PORT ", PORT) });


