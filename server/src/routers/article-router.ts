import express from "express";
import articleController from "../controllers/article-controller";

const articleRouter = express.Router();

articleRouter.post("/save", articleController.save);
articleRouter.post("/update", articleController.update);
articleRouter.get("/types", articleController.types);
articleRouter.post("/list", articleController.list);
articleRouter.post("/articleById/:id", articleController.article);

export default articleRouter;
