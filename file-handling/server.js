import express from "express";
import multer from "multer";
import cors from "cors";
import { join, resolve } from "path";
import fileRoutes from "./src/routes/fielUpload.js";

const app = express();
const dirPath = resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/image", express.static(join(dirPath, "uploads")));
const port = process.env.port || 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(dirPath, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/file-upload", upload.single("image"), (req, res) => {
  try {
    return res.status(200).send("File uploaded successfully");
  } catch (error) {
    return res.status(500).json({ error: "Error while uploading image" });
  }
});

app.use("/getFiles", fileRoutes);

app.get("/test", (req, res) => {
  return res.status(400).send("Backend running");
});

app.listen(port, () => {
  console.log("Server listening on port : " + port);
});

export default app;
