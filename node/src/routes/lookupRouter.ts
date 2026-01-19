// dependencies
import express from "express";
// controllers
import { getAllLookupData } from "../controllers/lookupController.js";
//middlewares
import { authenticateToken } from "../middlewares/jwtMiddleware.js";

// router
const lookupRouter = express.Router();

// get all lookup
lookupRouter.get("/", authenticateToken, getAllLookupData);

export default lookupRouter;
