import { Router } from "express";
import {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  removerProduto,
} from "./controllers";

const router = Router();

router.post("/produtos", cadastrarProduto);
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", buscarProdutoPorId);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", removerProduto);

export default router;