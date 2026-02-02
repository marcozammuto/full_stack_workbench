import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = fs.existsSync(path.resolve(".env"))
  ? path.resolve(".env")
  : path.resolve("..", ".env");


  dotenv.config({ path: envPath });

import app from "./app.js";

app.listen(process.env.NODE_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.NODE_PORT}`);
});
