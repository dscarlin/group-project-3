const router = require("express").Router();
const checkJwt = require("../../checkJwt")
const employerController = require("../../controllers/employerController");

//Matches with "/api/employer"
router
    .route("/")
    .post(checkJwt, employerController.create)

router
    .route("/:email")
    .get(checkJwt, employerController.findOne);
    // .delete(checkJwt, employerController.remove)
// router
//     .route("/:id/saved")
//     .get(employerController.findSaved)

module.exports = router;