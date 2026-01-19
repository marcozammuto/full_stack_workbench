export const FALLBACK_SERVER_PORT: number = 3000;

export enum RESPONSE_MESSAGES {
  DAY_ALREADY_UPDATED = "Your calendar is already updated",
  DAY_SUCCESS = "Calendar updated",
  DAY_EMPTY = "There are not registered days yet",
  ERROR_GENERAL = "Internal Server Error",
  ERROR_LOOKUP_NOT_FOUND = "Lookup data not found",
  ERROR_USER_NOT_FOUND = "User not found while requesting data",
  FORMAT_ERROR_DATE = "This string doesn't have the right datetime format",
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
