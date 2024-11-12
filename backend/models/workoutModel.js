const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
// the timestamps property adds the createdAt and updatedAt properties to the entries

module.exports = mongoose.model("Workout", workoutSchema);
