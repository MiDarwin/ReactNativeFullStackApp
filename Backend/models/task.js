const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: String,
    type: String,
    userId: { type: String, required: true }, // String tipinde olduğundan emin olun
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
