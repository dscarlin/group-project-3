const router = require("express").Router();
const checkJwt = require("../../checkJwt")
const employerController = require("../../controllers/employerController");

//Matches with "/api/employer"
router
    .route("/")
    .post(checkJwt, employerController.create)
    .get(checkJwt, employerController.findOne)
    .put(checkJwt, employerController.update);

router
    .route("/:_id")
    .delete(checkJwt, employerController.remove)
    // .get(checkJwt, employerController. findAll);


module.exports = router;