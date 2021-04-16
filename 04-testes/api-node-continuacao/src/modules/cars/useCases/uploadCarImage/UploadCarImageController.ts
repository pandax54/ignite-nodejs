import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    // para conseguirmos identificar o tipo
    const images = request.files as IFiles[];
    const images_name = images.map((file) => file.filename); // para ter acesso ao filename - interface (linha anterior)

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
