// dependencies
import express from "express";
// controllers
import { getAllDays, createDay, updateDay, } from "../controllers/dayController.js";
//middlewares
import { authenticateToken } from "../middlewares/jwtMiddleware.js";
// router
const dayRouter = express.Router();
// read
dayRouter.get("/", authenticateToken, getAllDays);
// create
dayRouter.post("/", authenticateToken, createDay);
// update
dayRouter.patch("/:id", authenticateToken, updateDay);
export default dayRouter;
//# sourceMappingURL=dayRouter.js.map