const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/:bookId", getBookById);

// Protected routes waterfall
router.use(requireAuth);

router.post("/", createBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;