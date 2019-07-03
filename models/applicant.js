const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema({
  name: { type: String, required: true },
  expInMonths: { type: Number, required: true },
  workHistory: {type: Array, default: undefined},
  availableWhen: { type: Date required: true },
  applicationDate: { type: Date, default: Date.now }
});

const Applicant = mongoose.model("Applicant", appSchema);

module.exports = Applicant;
