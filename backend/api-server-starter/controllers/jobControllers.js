const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// GET /api/jobs  (optional ?_limit=3)
const getAllJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);
    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const newJob = await Job.create({ ...req.body });
    res.status(201).json(newJob);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create job", error: error.message });
  }
};

// GET /api/jobs/:jobId
const getJobById = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job" });
  }
};

// PUT /api/jobs/:jobId
const updateJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update job", error: error.message });
  }
};

// DELETE /api/jobs/:jobId
const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const deletedJob = await Job.findOneAndDelete({ _id: jobId });
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
