// dependecies
import express from "express";
// routers
import * as routeDispatcher from "./routes/index.js";
import cookieParser from "cookie-parser";
// middlewares
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
//parsers
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/auth", routeDispatcher.authRouter);
app.use("/day", routeDispatcher.dayRouter);
// general error handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map