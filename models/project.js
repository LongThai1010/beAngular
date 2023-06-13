const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  name: String,
  size: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  start: { type: Date, default: Date.now },
  end: { type: Date },
  status: { type: String, default: "Working" },
});

module.exports = mongoose.model("Project", projectSchema);
