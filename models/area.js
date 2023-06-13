const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AreaSchema = new Schema({
  nameArea: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("areas", AreaSchema);
