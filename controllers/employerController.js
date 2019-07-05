db = require("../models");

module.exports = {
    create: (req, res) => {
        db.Employer
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findOne: (req, res) => {
        db.Employer
            .find(req.params)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};