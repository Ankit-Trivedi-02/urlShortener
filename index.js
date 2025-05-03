const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8001;
const routes = require("./routes/url");

//Mongo-db Connection

mongoose.connect("mongodb://127.0.0.1:27017/UrlWebsite")
    .then(() => { console.log(("Connected MongoDB")) })
    .catch((err) => { console.log("error:", err) });

//middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.use("/", routes);

//running server
app.listen(PORT, () => { console.log("Server started at PORT ", PORT) });


