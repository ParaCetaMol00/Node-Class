const { body } = require ("express-validator");


const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage(
      "Name must not be lesser than 3 characters or longer than 50 Characters",
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a Valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must contain at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        throw new Error("Password must contain at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        throw new Error("Password must contain at least one number");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        throw new Error("Password must contain at least one special character");
      }
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true; // Return true if it passes all checks
    }),

  body("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Gender must be either male or female"),

  body("role").optional().isIn(["user"]),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a Valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must contain at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        throw new Error("Password must contain at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        throw new Error("Password must contain at least one number");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        throw new Error("Password must contain at least one special character");
      }
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true; // Return true if it passes all checks
    }),
];

const createProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];

const updateProductValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];

module.exports = { registerValidator, loginValidator, createProductValidator, updateProductValidator };
// module.exports = { registerValidator, loginValidator };