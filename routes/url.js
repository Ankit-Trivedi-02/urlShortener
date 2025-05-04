const express = require("express");
const { handelInputUrl,handleRedirectUrl,handelAllUrls } = require("../controller/url");
const routes = express.Router();

routes.get("/",handelAllUrls);
routes.post("/", handelInputUrl);
routes.get("/:id",handleRedirectUrl);


module.exports = routes;