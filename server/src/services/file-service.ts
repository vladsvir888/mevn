import { join, extname } from "path";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { UploadedFile } from "express-fileupload";

class FileService {
  public async save(file: UploadedFile, pathToSave: string) {
    try {
      const folderPath = join(process.cwd(), "..", "client/public", pathToSave);
      await mkdir(folderPath, { recursive: true });

      const fileName = `${file.md5}${extname(file.name)}`;
      const uploadPath = join(folderPath, fileName);
      await writeFile(uploadPath, file.data);

      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async remove(path: string) {
    try {
      const removedPath = join(process.cwd(), "..", "client/public", path);
      await rm(removedPath);
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const fileService = new FileService();

export default fileService;
