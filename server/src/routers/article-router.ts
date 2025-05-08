import express from "express";
import articleController from "../controllers/article-controller";
import authMiddleware from "../middlewares/auth-middleware";

const articleRouter = express.Router();

articleRouter.post("/save", authMiddleware, articleController.save);
articleRouter.post("/update", authMiddleware, articleController.update);
articleRouter.post("/remove", authMiddleware, articleController.remove);
articleRouter.get("/types", authMiddleware, articleController.types);
articleRouter.post("/list", authMiddleware, articleController.list);
articleRouter.post(
  "/articleById/:id",
  authMiddleware,
  articleController.article
);
articleRouter.post(
  "/updateViewCount",
  authMiddleware,
  articleController.updateViewCount
);

export default articleRouter;
