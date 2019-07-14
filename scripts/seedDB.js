const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/onthfly"
);

applicantSeed = require("../sampleData/applicants.json");

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
