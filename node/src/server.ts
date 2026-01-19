import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

app.listen(process.env.NODE_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.NODE_PORT}`);
});
