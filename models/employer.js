const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Applicant = require("./applicant")

const employerSchema = new Schema({
  businessName: { type: String, required: true },
  email: { type: String, required: true},
  savedApplicants: [
    {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Applicant"
    }
]
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
