import jwt from "jsonwebtoken";
export const authenticateToken = (req, _res, next) => {
    const token = req.cookies.token.token || req.cookies.token;
    if (!token || token === undefined)
        return next({ status: 401, message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY));
        if (typeof decoded === "string" || !decoded.email || !decoded.code) {
            return next({ status: 401, message: "Invalid token payload" });
        }
        req.user = { email: decoded.email, code: decoded.code };
        next();
    }
    catch (err) {
        next({ status: 401, message: "Invalid token" });
    }
};
//# sourceMappingURL=jwtMiddleware.js.map