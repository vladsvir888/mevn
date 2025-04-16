import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types/status-code";
import { UploadedFile } from "express-fileupload";
import fileService from "../services/file-service";
import ArticleModel from "../models/article-model";
import ArticleTypeModel from "../models/article-type-model";
import AppError from "../exceptions/app-exception";

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
      const fileDir = "/images/articles";
      const resultFileSaving = await fileService.save(file, fileDir);

      if (!resultFileSaving) {
        throw AppError.BadRequest(
          "Произошла ошибка в результате загрузки файла"
        );
      }

      const articleData = {
        ...JSON.parse(req.body.data),
        file: `${fileDir}/${file.name}`,
      };

      await ArticleModel.insertMany([articleData]);
      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const articleList = await ArticleModel.find({}).lean();
      res.status(StatusCode.OK).json(articleList);
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();

export default articleController;
