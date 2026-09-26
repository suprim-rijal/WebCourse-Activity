const express = require("express");
const {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Public routes: anyone can read jobs
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

// Everything below this line requires a valid token
router.use(requireAuth);

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
