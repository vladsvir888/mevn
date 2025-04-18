import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types/status-code";
import { UploadedFile } from "express-fileupload";
import fileService from "../services/file-service";
import ArticleModel from "../models/article-model";
import ArticleTypeModel from "../models/article-type-model";
import AppError from "../exceptions/app-exception";
import helperBoxService from "../services/helper-box-service";

const PAGINATION_LIMIT = 8;
const FILE_DIR = "/images/articles";

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
      const resultFileSaving = await fileService.save(file, FILE_DIR);

      if (!resultFileSaving) {
        throw AppError.BadRequest(
          "Произошла ошибка в результате загрузки файла"
        );
      }

      const articleData = {
        ...JSON.parse(req.body.data),
        file: `${FILE_DIR}/${file.name}`,
      };

      await ArticleModel.insertMany([articleData]);
      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = JSON.parse(req.body.data);
      const article = await ArticleModel.findById(reqData.id).select({}).lean();

      if (!article) {
        throw AppError.BadRequest("Статья не найдена");
      }

      const articleFileName = article.file.split("/").pop() as string;
      const reqFile = req?.files?.file as UploadedFile;
      const reqFileName = reqFile.name;

      if (reqFileName !== articleFileName) {
        const resultFileSaving = await fileService.save(reqFile, FILE_DIR);

        if (!resultFileSaving) {
          throw AppError.BadRequest(
            "Произошла ошибка в результате загрузки файла"
          );
        }
      }

      const articleData = {
        ...reqData,
        file: `${FILE_DIR}/${reqFileName}`,
      };

      await ArticleModel.updateOne({ _id: reqData.id }, articleData);
      res.status(StatusCode.OK).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { userEmail } = req.body as { userEmail: string; page: number };

      const filter = userEmail ? { userEmail } : {};

      const count = await ArticleModel.countDocuments(filter);

      const { pages, page, skip, first } = helperBoxService.paginationData({
        count,
        body: req.body,
        limit: PAGINATION_LIMIT,
      });

      const articleList = await ArticleModel.find(filter)
        .limit(PAGINATION_LIMIT)
        .skip(skip)
        .lean();

      const data = {
        elements: articleList,
        pages,
        page,
        limit: PAGINATION_LIMIT,
        skip,
        count,
        first,
      };

      res.status(StatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async article(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = {
        _id: req.params.id,
        userEmail: req.body.userEmail,
      };
      const article = await ArticleModel.findOne(filter).lean();

      if (!article) {
        throw AppError.BadRequest("Статья не найдена");
      }

      res.status(StatusCode.OK).json(article);
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();

export default articleController;
