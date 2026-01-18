export declare const FALLBACK_SERVER_PORT: number;
export declare enum RESPONSE_MESSAGES {
    ERROR_GENERAL = "Internal Server Error",
    LOGIN_INVALID = "Wrong credentials",
    LOGIN_SUCCESS = "Logged in",
    SIGNUP_EMAIL_ALREADY_TAKEN = "Email already taken",
    SIGNUP_SUCCESS = "User successfully created, you will receive an email in order to confirm your account",
    RECOVERY_EMAIL_OK = "Please check your email inbox",
    RECOVERY_SUCCESS = "Password updated successfully"
}
export declare const SALT_ROUNDS: number;
export declare enum NODE_ENV_ENUM {
    PROD = "production",
    TEST = "test",
    DEV = "development"
}
export declare enum QUERY_PARAMS {
    code = "code",
    token = "tkn"
}
