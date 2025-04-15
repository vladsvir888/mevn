import express from "express";
import articleController from "../controllers/article-controller";

const articleRouter = express.Router();

articleRouter.post("/save", articleController.save);
articleRouter.get("/types", articleController.types);

export default articleRouter;
