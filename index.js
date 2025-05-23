const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8001;
const routes = require("./routes/url");
const staticRoute=require("./routes/staticRouter")
const path = require("path");
const methodOverride = require('method-override');


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


// routes
app.use("/url", routes);
app.use("/",staticRoute)

//running server
app.listen(PORT, () => { console.log("Server started at PORT ", PORT) });


