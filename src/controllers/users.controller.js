const express = require("express");
const router = express.Router();
const { userValidator } = require("../validators/users.validator");

const container = require("../bootstrap/container");

const userService = container.userService;

router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const users = await userService.getUserById(req.params?.id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/borrow/:bookId", async (req, res, next) => {
  try {
    const { id, bookId } = req.params;
    const users = await userService.borrowBook(id, bookId);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/return/:bookId", async (req, res, next) => {
  try {
    const { id, bookId } = req.params;
    const { score } = req.body;
    const users = await userService.returnBook(id, bookId, score);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", userValidator, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
