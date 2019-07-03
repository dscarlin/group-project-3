const router = require("express").Router();
const businessRoutes = require("./businesses");
const individualRoutes = require("./individuals");

//business account routes
router.use("/business", businessRoutes);
//individual account routes (applicants)
router.use("/individual", individualRoutes);

module.exports = router