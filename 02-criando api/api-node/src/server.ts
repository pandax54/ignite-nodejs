import express from "express";
import swaggerUi from "swagger-ui-express";

import router from "./routes";
import swaggerDoc from "./swagger.json";

const app = express();
app.use(express.json());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.listen(5000, () => console.log("Server is running!"));
