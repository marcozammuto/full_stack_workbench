// dependencies
import express from "express";
// controllers
import {
  getAllBookings,
  seedAllBookings,
} from "../controllers/bookingController.js";

//middlewares
import { authenticateToken } from "../middlewares/jwtMiddleware.js";

// router
const bookingRouter = express.Router();

// read
bookingRouter.post("/", getAllBookings);
bookingRouter.get("/seed", seedAllBookings);
// create
// update

export default bookingRouter;
