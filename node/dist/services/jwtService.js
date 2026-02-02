import jwt from "jsonwebtoken";
/**
 * JWT Service
 * Handles JSON Web Token generation for authentication
 */
/**
 * Signs a JWT token for a user session
 * @param user - User object containing code and email
 * @returns Object with user data and signed JWT token
 * @throws Error if JWT environment variables are not configured
 */
export const signToken = (user) => {
    const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;
    if (!JWT_SECRET_KEY || !JWT_EXPIRES_IN) {
        throw new Error("JWT setup variables are missing");
    }
    const token = jwt.sign({ code: user.code, email: user.email }, JWT_SECRET_KEY, {
        expiresIn: "30m",
    });
    return { user, token: token };
};
//# sourceMappingURL=jwtService.js.map