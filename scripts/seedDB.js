const mongoose = require("mongoose");
const db = require("../models");
require('dotenv').config();
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/onthefly",{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true }
);

applicantSeed = require("../sampleData/applicants.json");

db.Employer
  .deleteMany({})
  .then(data => {
    console.log("Employers deleted")
    
  })
  .catch (err => {
  console.error(err);
});


db.Applicant
  .deleteMany({})
  .then(() => db.Applicant.collection.insertMany(applicantSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
