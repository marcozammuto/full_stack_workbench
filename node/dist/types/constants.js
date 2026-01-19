export const FALLBACK_SERVER_PORT = 3000;
export var RESPONSE_MESSAGES;
(function (RESPONSE_MESSAGES) {
    RESPONSE_MESSAGES["DAY_ALREADY_UPDATED"] = "Your calendar is already updated";
    RESPONSE_MESSAGES["DAY_SUCCESS"] = "Calendar updated";
    RESPONSE_MESSAGES["DAY_EMPTY"] = "There are not registered days yet";
    RESPONSE_MESSAGES["ERROR_GENERAL"] = "Internal Server Error";
    RESPONSE_MESSAGES["ERROR_LOOKUP_NOT_FOUND"] = "Lookup data not found";
    RESPONSE_MESSAGES["ERROR_USER_NOT_FOUND"] = "User not found while requesting data";
    RESPONSE_MESSAGES["FORMAT_ERROR_DATE"] = "This string doesn't have the right datetime format";
    RESPONSE_MESSAGES["LOGIN_INVALID"] = "Wrong credentials";
    RESPONSE_MESSAGES["LOGIN_SUCCESS"] = "Logged in";
    RESPONSE_MESSAGES["SIGNUP_EMAIL_ALREADY_TAKEN"] = "Email already taken";
    RESPONSE_MESSAGES["SIGNUP_SUCCESS"] = "User successfully created, you will receive an email in order to confirm your account";
    RESPONSE_MESSAGES["RECOVERY_EMAIL_OK"] = "Please check your email inbox";
    RESPONSE_MESSAGES["RECOVERY_SUCCESS"] = "Password updated successfully";
})(RESPONSE_MESSAGES || (RESPONSE_MESSAGES = {}));
export const SALT_ROUNDS = 10;
export var NODE_ENV_ENUM;
(function (NODE_ENV_ENUM) {
    NODE_ENV_ENUM["PROD"] = "production";
    NODE_ENV_ENUM["TEST"] = "test";
    NODE_ENV_ENUM["DEV"] = "development";
})(NODE_ENV_ENUM || (NODE_ENV_ENUM = {}));
export var QUERY_PARAMS;
(function (QUERY_PARAMS) {
    QUERY_PARAMS["code"] = "code";
    QUERY_PARAMS["token"] = "tkn";
})(QUERY_PARAMS || (QUERY_PARAMS = {}));
//# sourceMappingURL=constants.js.map