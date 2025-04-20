import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types/status-code";
import { UploadedFile } from "express-fileupload";
import ArticleTypeModel from "../models/article-type-model";
import AppError from "../exceptions/app-exception";
import articleService from "../services/article-service";

class ArticleController {
  public async types(req: Request, res: Response, next: NextFunction) {
    try {
      const articleTypes = await ArticleTypeModel.find({}).lean();
      res.status(StatusCode.OK).json(articleTypes);
    } catch (error) {
      next(error);
    }
  }

  public async save(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        throw AppError.BadRequest("Файл не загружен");
      }

      const file = req.files.file as UploadedFile;
      const data = JSON.parse(req.body.data);

      await articleService.saveArticle(file, data);

      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        throw AppError.BadRequest("Файл не загружен");
      }

      const file = req.files.file as UploadedFile;
      const data = JSON.parse(req.body.data);

      await articleService.updateArticle(file, data);

      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = req.body.id;

      if (!articleId) {
        throw AppError.BadRequest("Id статьи не передан");
      }

      await articleService.removeArticle(articleId);

      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await articleService.getArticles(req.body);
      res.status(StatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async article(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = req.params.id;

      if (!articleId) {
        throw AppError.BadRequest("Id статьи не передан");
      }

      const userEmail = req.body.userEmail;

      if (!userEmail) {
        throw AppError.BadRequest("Email пользователя не передан");
      }

      const article = await articleService.getArticle(articleId, userEmail);

      res.status(StatusCode.OK).json(article);
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();

export default articleController;
