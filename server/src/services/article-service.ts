import path from "path";
import { UploadedFile } from "express-fileupload";
import AppError from "../exceptions/app-exception";
import ArticleModel from "../models/article-model";
import fileService from "./file-service";
import helperBoxService from "./helper-box-service";

const PAGINATION_LIMIT = 8;
const FILE_DIR = "/images/articles";

class ArticleService {
  public async getArticle(articleId: string, userEmail: string) {
    const filter = {
      _id: articleId,
      userEmail,
    };
    const article = await ArticleModel.findOne(filter).lean();

    if (!article) {
      throw AppError.BadRequest("Статья не найдена");
    }

    return article;
  }

  public async saveArticle(file: UploadedFile, data: Record<string, unknown>) {
    const fileName = `${file.md5}${path.extname(file.name)}`;
    const resultFileSaving = await fileService.save(file, FILE_DIR);

    if (!resultFileSaving) {
      throw AppError.BadRequest("Произошла ошибка в результате загрузки файла");
    }

    const articleData = {
      ...data,
      file: `${FILE_DIR}/${fileName}`,
    };

    await ArticleModel.insertMany([articleData]);
  }

  public async updateArticle(
    file: UploadedFile,
    data: Record<string, unknown>
  ) {
    const article = await ArticleModel.findById(data.id).select({}).lean();

    if (!article) {
      throw AppError.BadRequest("Статья не найдена");
    }

    const fileName = `${file.md5}${path.extname(file.name)}`;
    const articleFileName = article.file.split("/").pop() as string;

    if (fileName !== articleFileName) {
      const resultFileSaving = await fileService.save(file, FILE_DIR);

      if (!resultFileSaving) {
        throw AppError.BadRequest(
          "Произошла ошибка в результате загрузки файла"
        );
      }

      await fileService.remove(article.file);
    }

    const articleData = {
      ...data,
      file: `${FILE_DIR}/${fileName}`,
    };

    await ArticleModel.updateOne({ _id: data.id }, articleData);
  }

  public async removeArticle(articleId: string) {
    const article = await ArticleModel.findById(articleId).select({}).lean();

    if (!article) {
      throw AppError.BadRequest("Статья не найдена");
    }

    await ArticleModel.deleteOne({ _id: articleId });
    await fileService.remove(article.file);
  }

  public async getArticles(data: { page: number; userEmail?: string }) {
    const filter = data.userEmail ? { userEmail: data.userEmail } : {};
    const count = await ArticleModel.countDocuments(filter);
    const { pages, page, skip, first } = helperBoxService.paginationData({
      count,
      limit: PAGINATION_LIMIT,
      reqPage: data.page,
    });
    const articleList = await ArticleModel.find(filter)
      .limit(PAGINATION_LIMIT)
      .skip(skip)
      .lean();
    const articles = {
      elements: articleList,
      pages,
      page,
      limit: PAGINATION_LIMIT,
      skip,
      count,
      first,
    };

    return articles;
  }
}

const articleService = new ArticleService();

export default articleService;
