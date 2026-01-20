// dependecies
import express from "express";
// routers
import * as routeDispatcher from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// middlewares
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
// settings
app.use(cors({ origin: ["http://localhost:5173"] }));
//parsers
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/auth", routeDispatcher.authRouter);
app.use("/day", routeDispatcher.dayRouter);
app.use("/lookup", routeDispatcher.lookupRouter);
// general error handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map