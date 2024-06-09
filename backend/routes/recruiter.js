const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recruiter = require('../models/Recruiter');
const JobPost = require('../models/JobPost');

router.get('/', auth, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.userId).populate('jobPosts');
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
