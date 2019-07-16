db = require("../models")
const sendMessage = require("../twillio/send_sms");

    
module.exports = {
    create: (req, res) => {
        db.Applicant
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {console.log(err); res.status(422).json(err)});
            
    },
    findAll: (req, res) => {
        //remove position query if none selected to match all positions
        if(!req.query.selectedPositions.length)
            delete req.query.selectedPositions;
        else{
            //matches any applicants that have one or more
            //of the specified position search criteria
            req.query.selectedPositions = { "$in" : req.query.selectedPositions.split(",") };
        }
        
        //remove availability query if none selected to match all availabilities
        if(!req.query.availability.length)
            delete req.query.availability;
        else{
            //matches any applicants that have all or any of the specified
            //availabilities depending on the value of checkbox
                req.query.availability = {  [req.query.checkbox] : req.query.availability.split(",") };
        }
        
        delete req.query.checkbox;
        console.log(req.query)
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
    },
    sendSMS: (req, res) => {
        //send sms through twilio
        let { phoneNumber, message } = req.body
        console.log(message)
        sendMessage(phoneNumber, message);
        const user = { email: req.user.email }
        //update employer info that applicant has been messaged
        const messaged = { "$push" : { messaged: req.params._id }, "$addToSet" : {interested : req.params._id} };
        db.Employer
            .findOneAndUpdate(user, messaged)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        },
};