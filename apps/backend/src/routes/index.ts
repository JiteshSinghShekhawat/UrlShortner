import { Router, Request, Response } from "express";
import { createUrl, shortUrl } from "../controllers/controller";

export const router = Router();

router.get("/:sUrl", shortUrl);

router.post("/create-url", createUrl);
