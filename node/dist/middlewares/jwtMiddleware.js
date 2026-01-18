import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token.token;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, String(process.env.JWT_SECRET_KEY), (err, user) => {
        if (err) {
            return next(err);
        }
        req.user = user;
        return next();
    });
};
//# sourceMappingURL=jwtMiddleware.js.map