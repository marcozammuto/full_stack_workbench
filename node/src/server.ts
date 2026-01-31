import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config({
  path: path.resolve("..", ".env"),
});

import app from "./app.js";

app.listen(process.env.NODE_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.NODE_PORT}`);
});
