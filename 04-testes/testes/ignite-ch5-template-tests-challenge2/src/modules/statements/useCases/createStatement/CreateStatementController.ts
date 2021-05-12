import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;
    const { recipient_id } = request.params;
    const { amount, description } = request.body;



    const splittedPath = request.originalUrl.split("/")

    let type = splittedPath[splittedPath.length - 1] as OperationType;

    if(recipient_id) {
      type = OperationType.TRANSFER
    }


    const createStatement = container.resolve(CreateStatementUseCase);

    let statement;

    if (!(type === 'transfer')) {

      statement = await createStatement.execute({
        user_id: id,
        type,
        amount,
        description,
      });
    }

    if (type === 'transfer') {
      statement = await createStatement.execute({
        user_id: String(recipient_id),
        type,
        amount,
        description,
        sender_id: id
      });


    }



    return response.status(201).json(statement);
  }
}
