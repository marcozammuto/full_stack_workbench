import { body, validationResult } from "express-validator";
const validators = {
    email: body("email")
        .notEmpty()
        .withMessage("Email is required")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email should have a correct format"),
    password: body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password should be at least 8 characters long")
        .matches(/^(?=.*?\w)(?=.*?\d)(?=.*?\W)[\d\w\W]{8,50}$/i)
        .withMessage("Passwords should have at least a number, a letter and a special character"),
};
const errorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    return next();
};
export const validateAuthPayload = [
    validators.email,
    validators.password,
    errorHandler,
];
export const validatePasswordRecoveryPayload = [validators.email, errorHandler];
//# sourceMappingURL=authMiddleware.js.map