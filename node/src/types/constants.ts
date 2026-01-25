export const FALLBACK_SERVER_PORT: number = 3000;

export enum RESPONSE_MESSAGES {
  DAY_MODIFIER_NOT_FOUND = "Invalid day modifier code",
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

export enum FILE_ENUM {
  LOOKUP_DAY_MODIFIER = "dayModifiers.json",
}

export const guestNames: string[] = [
  "John Doe",
  "Marius Red",
  "Aravid Krishanwamy",
  "Lucia Bellini",
  "Luca Verdi",
  "Francesco San",
  "Giulia Bosco",
  "Paolo Petitto",
  "Sara Gialli",
  "Carlo Palermo",
  "Marco Bianchi",
  "Elena Rossi",
  "Andrea Conti",
  "Valentina Moretti",
  "Matteo Ferrara",
  "Alessia Romano",
  "Davide Ricci",
  "Chiara Lombardi",
  "Stefano Greco",
  "Federica Marchetti",
  "Simone De Luca",
  "Martina Esposito",
  "Giorgio Rinaldi",
  "Beatrice Puglisi",
  "Nicola Barbieri",
  "Ilaria Fontana",
  "Alberto Mancini",
  "Francesca Vitale",
  "Roberto Caruso",
  "Silvia Parisi",
  "Thomas Walker",
  "Emily Carter",
  "Michael Brown",
  "Sophia Miller",
  "Daniel Wilson",
  "Olivia Harris",
  "James Turner",
  "Isabella Moore",
  "Benjamin Scott",
  "Charlotte Adams",
  "Pierre Dubois",
  "Claire Martin",
  "Lucas Bernard",
  "Camille Laurent",
  "Miguel Alvarez",
  "Ana Rodriguez",
  "Jan Kowalski",
  "Katarzyna Nowak",
  "Nikos Papadopoulos",
  "Eleni Georgiou",
];
