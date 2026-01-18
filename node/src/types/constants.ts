export const FALLBACK_SERVER_PORT: number = 3000;

export enum RESPONSE_MESSAGES {
  ERROR_GENERAL = "Internal Server Error",
  LOGIN_INVALID = "Wrong credentials",
  LOGIN_SUCCESS = "Logged in",
  SIGNUP_EMAIL_ALREADY_TAKEN = "Email already taken",
  SIGNUP_SUCCESS = "User successfully created, you will receive an email in order to confirm your account",
  RECOVERY_EMAIL_OK = "Please check your email inbox",
  RECOVERY_SUCCESS = "Password updated successfully",
}

export const SALT_ROUNDS: number = 10;

export enum NODE_ENV_ENUM {
  PROD = "production",
  TEST = "test",
  DEV = "development",
}

export enum QUERY_PARAMS {
  code = "code",
  token = "tkn",
}
