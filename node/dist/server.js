import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import app from "./app.js";
app.listen(process.env.NODE_PORT, () => {
    console.log(`app listening on http://localhost:${process.env.NODE_PORT}`);
});
//# sourceMappingURL=server.js.map