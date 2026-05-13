import express, { Request, Response } from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.use((_req: Request, res: Response): void => {
  res.status(404).json({ message: "Rota nao encontrada" });
});

app.listen(3000, (): void => {
  console.log("Servidor rodando em http://localhost:3000");
});