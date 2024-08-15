const express = require("express");
const router = express.Router();
const container = require("../bootstrap/container");
const bookService = container.bookService;

router.get("/", async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params?.id);
    res.json({ name: book.name, averageScore: book.averageScore });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
