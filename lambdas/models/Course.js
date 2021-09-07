const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  code: String,
  name: String,
  description: String,
  division: String,
  department: String,
  prerequisites: String,
  exclusions: String,
  level: Number,
  campus: String,
  term: String,
  prerequisites_array: [String],
  required_for: [String],
});

module.exports = Course;
