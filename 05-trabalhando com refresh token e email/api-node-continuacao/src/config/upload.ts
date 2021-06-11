import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  storage: multer.diskStorage({
    destination: tmpFolder, // raiz do projeto - __dirname = referencia do folder atual
    filename: (request, file, callback) => {
      // sobrescrever o filename
      const fileHash = crypto.randomBytes(16).toString("hex"); // criar um hash randomico
      const fileName = `${fileHash}-${file.originalname}`; // e concatenar com o nome do arquivo

      return callback(null, fileName); // (err, file)
    },
  }),
};
