db = require("../models");

module.exports = {
    create: (req, res) => {
        db.Employer
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findOne: (req, res) => {
        console.log("call employer db")
        db.Employer
            .findOne(req.query)
            .then(dbModel => {console.log(dbModel); res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        console.log(req.params)
        db.Employer
            .remove(req.params)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        const { _id } = req.body;
        db.Employer
            .update({ _id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAll: (req, res) => {
        const { m, s } = req.query;
        console.log(m, " ", s)
        const saved = s ? { _id: { "$in" : s.split(",") }} : { _id: { "$in" : [] }};
        const messaged = m ? { _id: { "$in" : m.split(",") }} : { _id: { "$in" : [] }};

        let messagedResult, savedResult;
        db.Applicant
            .find(saved)
            .then( savedResult => { 
                db.Applicant
                    .find(messaged)
                    .then( messagedResult => {
                        res.json({ messagedResult, savedResult }) 
                    })                   
                    .catch(err => res.status(423).json(err));
            })
            .catch(err => res.status(422).json(err));
        
    }   
};