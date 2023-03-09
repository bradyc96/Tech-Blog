
const express = require("express");
const router = express.Router();

const apiRoutes = require('./api');
router.use("/api", apiRoutes);


const homeRoutes = require("./homeRoutes.js");
router.use("/", homeRoutes);

const dashboardRoutes = require("./dashboardRoutes.js")
router.use("/dashboard", dashboardRoutes) 

module.exports = router;