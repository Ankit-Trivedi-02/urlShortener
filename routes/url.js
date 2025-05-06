const express = require("express");
const { handelInputUrl,handleRedirectUrl,handelAllUrls,handelDeleteUrl } = require("../controller/url");
const routes = express.Router();

routes.get("/",handelAllUrls);
routes.post("/", handelInputUrl);
routes.get("/:id",handleRedirectUrl);
routes.delete("/:id", handelDeleteUrl);

module.exports = routes;