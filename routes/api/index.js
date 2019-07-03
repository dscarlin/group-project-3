const router = require("express").Router();
const candidateRoutes = require("./candidates");
const applicantRoutes = require("./applicants");
const accountRoutes = require("./accounts");

// Candidate routes (saved applicants)
router.use("/candidates", candidateRoutes);
// Applicant routes (all applicants)
router.use("/applicants", applicantRoutes);
// Account information routes
router.use("/accounts", accountRoutes);


module.exports = router;
