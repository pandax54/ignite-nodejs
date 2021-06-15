import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file); // representação do nome (path) / todo upload parte inicialmente do tmp e depois mandaremos pra S3

    // fs -> leitura do arquivo (de fato o arquivo)
    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`, // caminho dentro da S3 AWS
        Key: file, // file
        ACL: "public-read", // permissoes,
        Body: fileContent, // leitura do arquivo (de fato o arquivo)/ Buffer
        ContentType, // sem isso ele fará download automático (yarn add mime -D) (yarn add @types/mime -D)
      })
      .promise();

    await fs.promises.unlink(originalName); // deletar da pasta temporária

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`, // caminho dentro da S3 AWS
        Key: file, // file
      })
      .promise();
  }
}

export { S3StorageProvider };
