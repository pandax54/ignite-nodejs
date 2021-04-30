import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); // verifica se um arquivo existe ou nao
  } catch {
    // eslint-disable-next-line prettier/prettier
      return;
  }

  await fs.promises.unlink(filename); // deletar file armazenada na pasta temporária
};
