// dependencies
import express from "express";
// controllers
import { handleGetMe, handleLogin, handleLogout, handlePasswordChange, handleSignup, issuePasswordChangeToken, } from "../controllers/authController.js";
import { validatePasswordRecoveryPayload, validateAuthPayload, } from "../middlewares/authMiddleware.js";
//middlewares
import { authenticateToken } from "../middlewares/jwtMiddleware.js";
// router
const authRouter = express.Router();
// signup
authRouter.post("/signup", validateAuthPayload, handleSignup);
// login
authRouter.post("/login", validateAuthPayload, handleLogin);
// logout
authRouter.post("/logout", handleLogout);
// retrieve user data
authRouter.get("/me", authenticateToken, handleGetMe);
// forgot pwd - request
authRouter.post("/password/request", validatePasswordRecoveryPayload, issuePasswordChangeToken);
// forgot pwd - update
authRouter.post("/password/reset", handlePasswordChange);
export default authRouter;
//# sourceMappingURL=authRouter.js.map