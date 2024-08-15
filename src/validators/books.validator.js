const { body, validationResult } = require("express-validator");

const bookValidator = [
  body("name").notEmpty().withMessage("Title is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { bookValidator };
