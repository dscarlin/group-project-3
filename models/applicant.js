const mongoose = require("mongoose");
const relationship = require('mongoose-relationship');
const Schema = mongoose.Schema;
const appSchema = new Schema({
  selectedPositions: [
    {
      type: String
    }
  ],
  availability: [
    {
      type: String
    }
  ],
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  
  positionsWorked1: [
    {
      type: String
    }
  ],
  whMonths1: { type: Number },
  whDetails1: { type: String },
  positionsWorked2: [
    {
      type: String
    }
  ],
  whMonths2: { type: Number },
  whDetails2: { type: String },
  positionsWorked3: [
    {
      type: String
    }
  ],
  whMonths3: { type: Number },
  whDetails3: { type: String },
  coverLetter: { type: String },
  applicationDate: { type: Date, default: Date.now },
  employers: [
    {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Employer",
        childPath: "applicants"
    }
  ]

});
appSchema.plugin(relationship, { relationshipPathName:['employers'] });

const Applicant = mongoose.model("Applicant", appSchema);

module.exports = Applicant;
