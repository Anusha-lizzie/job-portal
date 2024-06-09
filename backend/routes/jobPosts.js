const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobPost = require('../models/JobPost');

// Add job post
router.post('/', auth, async (req, res) => {
  const { jobTitle, salary, description, vacantPosts } = req.body;
  try {
    const newJobPost = new JobPost({
      jobTitle,
      salary,
      description,
      vacantPosts,
      recruiter: req.user.userId
    });
    const jobPost = await newJobPost.save();
    res.json(jobPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete job post
router.delete('/:id', auth, async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    await jobPost.remove();
    res.json({ message: 'Job post removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
