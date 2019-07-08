const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Applicant = require("./applicant")

const employerSchema = new Schema({
  businessName: { type: String  },
  streetAddress: { type: String  },
  city: { type: String  },
  state: {type: String },
  zipcode: {type: String},
  email: { type: String },
  phone: { type: String },
  interested: [
    {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Applicant",
    }
  ],
  notInterested: [
    {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Applicant",
    }
  ], 
  messaged: [
    {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Applicant",
    }
  ]
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
