const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "areas",
  },
  role: { type: String, default: "Employee" },
  phone: String,

  status: {
    type: String,
    enum: ["Available", "Busy"],
    default: "Available",
  },
  image: String,
});

employeeSchema.methods.gravatar = function (size) {
  if (!this.size) size = 200;
  if (!this.email) {
    return "https://gravatar.com/avatar/?s" + size + "&d=retro";
  } else {
    var md5 = bcrypt.hashSync(this.email, 10);
    return "https://gravatar.com/avatar/" + md5 + "?s" + size + "&d=retro";
  }
};

module.exports = mongoose.model("Employee", employeeSchema);
