import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // leitura do arquivo em partes
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      // por padrão o delimitador é a vírgula
      const parseFile = csvParse();

      // pega o que tá sendo lido e transfere cada pedaço
      // para cada trecho da file usaremos a csv-parse
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          console.log(line);
          // ["name", "description"]
          const [name, description] = line;
          await this.categoriesRepository.create({
            name,
            description,
          });
        })
        // agora o código espera a finalização da leitura de toda a file para finalizar e enviar o resultado
        .on("end", () => {
          // deletar o arquivo após o final da leitura
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlredyExists = await this.categoriesRepository.findByName(
        name
      );
      if (!categoryAlredyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
