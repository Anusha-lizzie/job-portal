const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  vacantPosts: { type: Number, required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }
});

module.exports = mongoose.model('JobPost', JobPostSchema);
