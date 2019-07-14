const mongoose = require("mongoose");
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
  
});

const Applicant = mongoose.model("Applicant", appSchema);

module.exports = Applicant;
