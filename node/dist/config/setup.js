import { FALLBACK_SERVER_PORT } from "../types/constants.js";
export const setupEnvironmentVariables = () => {
    if (!process.env.NODE_PORT) {
        process.env.NODE_PORT = FALLBACK_SERVER_PORT.toString();
    }
};
//# sourceMappingURL=setup.js.map