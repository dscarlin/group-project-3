const router = require("express").Router();
const checkJwt = require("../../checkJwt")
const employerController = require("../../controllers/employerController");

//Matches with "/api/employer"
router
    .route("/")
    .post(checkJwt, employerController.create)
    .get(checkJwt, employerController.findOne)

router
    .route("/:_id")
    .delete(checkJwt, employerController.remove);
// router
//     .route("/:id/saved")
//     .get(employerController.findSaved)

module.exports = router;