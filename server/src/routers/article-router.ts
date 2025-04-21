import express from "express";
import articleController from "../controllers/article-controller";

const articleRouter = express.Router();

articleRouter.post("/save", articleController.save);
articleRouter.post("/update", articleController.update);
articleRouter.post("/remove", articleController.remove);
articleRouter.get("/types", articleController.types);
articleRouter.post("/list", articleController.list);
articleRouter.post("/articleById/:id", articleController.article);
articleRouter.post("/updateViewCount", articleController.updateViewCount);

export default articleRouter;
