import path from "path";
import { UploadedFile } from "express-fileupload";

class FileService {
  async save(file: UploadedFile, pathToSave: string) {
    try {
      const uploadPath = path.join(
        process.cwd(),
        "..",
        "client/public",
        pathToSave,
        file.name
      );
      await file.mv(uploadPath);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const fileService = new FileService();

export default fileService;
