import { readFile } from "fs";
import path from "path";

const lookupPath = path.resolve("..", "lookup", "dayModifiers.json");

const func = async () => {
  readFile(lookupPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
};

func();
