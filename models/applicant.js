const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appSchema = new Schema({
  selectedPositions: {
      type: [String],
      required: [true, "Position applying for is required."],
      enum: ["Server", "Bar Tender", "Busser", "FOH Manager", "BOH Manager", "Line Cook", "Dishwasher", "Prep Cook"]
  },
  availability: [
    {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Late Night"]
    }
  ],
  name: { type: String, required: [true, "Name required"]},
  email: { type: String, trim: true, match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, "Email Invalid."] },
  phone: { type: String, required: [true, "Phone number required."] },
  industryExperience: { type: Number, min: [0, "Years of industry experience must be posititve."] },
  restaurantName1: { type: String },
  positionsWorked1: [
    {
      type: String,
      enum: ["Server", "Bar Tender", "Busser", "FOH Manager", "BOH Manager", "Line Cook", "Dishwasher", "Prep Cook",  "Other"]
    }
  ],
  whMonths1: { type: Number, min: [0, "Work History 1 months of experience must be posititve."] },
  whDetails1: { type: String },
  restaurantName2: { type: String },
  positionsWorked2: [
    {
      type: String,
      enum: ["Server", "Bar Tender", "Busser", "FOH Manager", "BOH Manager", "Line Cook", "Dishwasher", "Prep Cook",  "Other"]
    }
  ],
  whMonths2: { type: Number, min: [0, "Work History 2 months of experience must be posititve."] },
  whDetails2: { type: String },
  restaurantName3: { type: String },
  positionsWorked3: [
    {
      type: String,
      enum: ["Server", "Bar Tender", "Busser", "FOH Manager", "BOH Manager", "Line Cook", "Dishwasher", "Prep Cook",  "Other"]
    }
  ],
  whMonths3: { type: Number, min: [0, "Work History 3 months of experience must be posititve."] },
  whDetails3: { type: String },
  coverLetter: { type: String },
  
}, 
{timestamps: true}
);
appSchema.index( { "createdAt": 1 }, { expireAfterSeconds: '90 days' } )


const Applicant = mongoose.model("Applicant", appSchema);

module.exports = Applicant;
