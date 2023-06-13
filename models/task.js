const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const taskSchema = new Schema({
  nameTask: String,
  dateStart: {
    type: Date,
    default: Date.now,
  },
  description: String,
  priority: {
    type: String,
    enum: ["Less Important", "Normal", "Important"],
    default: "Normal",
  },
  status: {
    type: String,
    enum: ["Holding", "Processing", "Done"],
    default: "Holding",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  userCreateTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: "Employee",
  },
});

module.exports = mongoose.model("Task", taskSchema);
