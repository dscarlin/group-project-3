const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Applicant = require("./applicant")

const employerSchema = new Schema({
  businessName: { type: String, required: true },
  savedApplicants: {type: [Applicant], default: undefined}
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
