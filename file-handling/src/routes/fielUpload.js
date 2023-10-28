import express from "express";
import { getFiles } from "../controller/file.js";

const router = express.Router();

router.get("/", getFiles);

export default router;
