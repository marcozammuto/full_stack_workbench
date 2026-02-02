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
export declare const signToken: (user: {
    code: string;
    email: string;
}) => {
    user: {
        code: string;
        email: string;
    };
    token: string;
};
