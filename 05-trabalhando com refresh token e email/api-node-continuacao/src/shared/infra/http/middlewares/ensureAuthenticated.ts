import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing token", 401);
  }
  // desestruturar o Bearer token
  // [0] = Bearer, [1] = token
  // podemos ignora a posição zero
  const [, token] = authHeader.split(" "); // criar um array com duas posicoes separando pelo espaço
  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload; // forçando o tipo

    // find the user
    // const usersRepository = new UsersRepository();
    // const user = await usersRepository.findById(user_id);
    const usersTokensRepository = new UsersTokensRepository();
    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );
    if (!user) {
      throw new AppError("User does not exist", 404);
    }
    request.user = {
      // precisaremos criar nossa propria tipagem no request
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
