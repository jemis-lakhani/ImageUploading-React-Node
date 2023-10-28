import { log } from "console";
import fs from "fs";

export const getFiles = (req, res) => {
  const imageList = fs.readdirSync("uploads");
  try {
    return res.json(imageList);
  } catch (error) {
    return res.status(500).json({ error: "Error while getting files" });
  }
};
