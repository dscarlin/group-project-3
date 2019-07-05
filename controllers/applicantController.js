db = require("../models")

module.exports = {
    create: (req, res) => {
        db.Applicant
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAll: (req, res) => {
        req.query.selectedPositions = 
        //matches any applicants that have one or more
        //of the specified position search criteria
        { "$in" : req.query.selectedPositions.split(",") };
        req.query.availability = 
        //matches any applicants that have all of the specified
        //availabilities
        {  [req.query.checkbox] : req.query.availability.split(",") };
        delete req.query.checkbox;
        db.Applicant
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        console.log(req.params)
        db.Applicant
        .findOneAndRemove(req.params)
        .then()
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } 
};