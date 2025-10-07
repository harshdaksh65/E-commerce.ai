const { body, validationResult } = require("express-validator");

const responseWithValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registerUserValidator = [
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),
    body("fullname.lastname")
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),
    body("role")
        .optional()
        .isIn(["user", "seller"])
        .withMessage("Role must be either 'user' or 'seller'"),
    responseWithValidationErrors
];

const loginUserValidator = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    body('username')
        .optional() 
        .isString()
        .withMessage('Username must be a string'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        if (!req.body.email && !req.body.username) {
            return res.status(400).json({
                error: [{ msg: 'Either email or username is required' }]
            });
        }
        responseWithValidationErrors(req, res, next); 
    }
    
];
const addUserAddressValidator = [
    body("street")
        .notEmpty()
        .withMessage("Street is required")
        .isString()
        .withMessage("Street must be a string"),
    body("city")
        .notEmpty()
        .withMessage("City is required")
        .isString()
        .withMessage("City must be a string"),
    body("state")
        .notEmpty()
        .withMessage("State is required")
        .isString()
        .withMessage("State must be a string"),
    body("zip")
        .notEmpty()
        .withMessage("Zip code is required")
        .isString()
        .withMessage("Zip code must be a string"),
    body("country")
        .notEmpty()
        .withMessage("Country is required")
        .isString()
        .withMessage("Country must be a string"),
    body("isDefault")
        .isBoolean()
        .withMessage("isDefault must be a boolean"),
    responseWithValidationErrors
];

module.exports = {
    registerUserValidator,
    loginUserValidator,
    addUserAddressValidator
};