const router = require("express").Router();
const checkJwt = require("../../checkJwt")
const applicantController = require("../../controllers/applicantController");


//Matches with "/api/applicant"
router
    .route("/")
    .get(checkJwt, applicantController.findAll)
    .post(applicantController.create);
    

router
    .route("/:_id")
    .delete(checkJwt, applicantController.remove)
    .post(checkJwt, applicantController.sendSMS);

module.exports = router;