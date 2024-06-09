const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' }]
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);
