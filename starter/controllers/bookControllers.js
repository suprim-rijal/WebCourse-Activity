const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

// GET /api/books/:bookId
const getBookById = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book" });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const user_id = req.user._id; // Attached by requireAuth middleware
    const newBook = new Book({
      ...req.body,
      user_id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(400).json({ message: "Failed to create book", error: error.message });
  }
};

// PUT /api/books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { ...req.body },
      { returnDocument: "after" }
    );
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

// DELETE /api/books/:bookId
const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const deletedBook = await Book.findOneAndDelete({ _id: bookId });
    if (deletedBook) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};