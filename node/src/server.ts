import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

app.listen(process.env.NODE_PORT, () => {
  console.log(`app listening on http://localhost:${process.env.NODE_PORT}`);
});
