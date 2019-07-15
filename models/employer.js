const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Applicant = require("./applicant")

const employerSchema = new Schema({
  businessName: { type: String, required: ["Business name is required"] },
  streetAddress: { type: String, required: ["Street address is required"] },
  city: { type: String,  required: [true, "City is required"]},
  state: {type: String, required: [true, "State is required"], minlength: [2, "State must be two characters"], maxlength: [2, "State must be two characters"]},
  zipcode: { type: String, trim: true, match: [/^[0-9]{5}(?:-[0-9]{4})?$/, "Zip code Invalid."] },
  email: { type: String, unique: true, trim: true, match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, "Email Invalid."] },
  phone: { type: String, required: [true, "Phone number required"] },
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
