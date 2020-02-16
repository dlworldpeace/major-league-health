const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema({
    time: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    temperature: {
      type: Number,
      default: 0,
      validate(value) { 
        if (value < 0) throw new Error("Negative body temperature aren't real.");
      }
    },
  });
  
const Observation = mongoose.model("Observation", ObservationSchema);
module.exports = Observation;
  