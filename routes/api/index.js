const router = require("express").Router();
const employerRoutes = require("./employer");
const applicantRoutes = require("./applicant");


// Employer routes 
router.use("/employer", employerRoutes);
// Applicant routes 
router.use("/applicant", applicantRoutes);


module.exports = router;
