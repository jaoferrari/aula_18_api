import { Request, Response } from "express";
import { produtos } from "./data";
import { validarProduto } from "./validators";
import { Produto } from "./types";

export function cadastrarProduto(req: Request, res: Response): void {
  try {
    const data: any = req.body;
    validarProduto(data);

    const existe = produtos.find((p) => p.id === data.id);
    if (existe) {
      res.status(400).json({ message: "ID ja cadastrado" });
      return;
    }

    const produto: Produto = {
      id: data.id,
      nome: data.nome,
      preco: data.preco,
      fabricante: {
        nome: data.fabricante.nome,
        endereco: {
          cidade: data.fabricante.endereco.cidade,
          pais: data.fabricante.endereco.pais,
        },
      },
    };

    produtos.push(produto);
    res.status(200).json(produto);
  } catch (e: unknown) {
    res.status(400).json({ message: (e as Error).message });
  }
}

export function listarProdutos(_req: Request, res: Response): void {
  try {
    res.status(200).json(produtos);
  } catch (e: unknown) {
    res.status(500).json({ message: (e as Error).message });
  }
}

export function buscarProdutoPorId(req: Request, res: Response): void {
  try {
    const id: number = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      res.status(404).json({ message: "Produto nao encontrado" });
      return;
    }

    res.status(200).json(produto);
  } catch (e: unknown) {
    res.status(500).json({ message: (e as Error).message });
  }
}

export function atualizarProduto(req: Request, res: Response): void {
  try {
    const id: number = Number(req.params.id);
    const data: any = req.body;
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      res.status(404).json({ message: "Produto nao encontrado" });
      return;
    }

    if (data.nome !== undefined) {
      if (typeof data.nome !== "string" || data.nome.trim() === "") {
        res.status(400).json({ message: "Nome invalido" });
        return;
      }
      produto.nome = data.nome;
    }

    if (data.preco !== undefined) {
      if (typeof data.preco !== "number" || data.preco <= 0) {
        res.status(400).json({ message: "Preco deve ser maior que zero" });
        return;
      }
      produto.preco = data.preco;
    }

    if (data.fabricante?.nome !== undefined) {
      produto.fabricante.nome = data.fabricante.nome;
    }
    if (data.fabricante?.endereco?.cidade !== undefined) {
      produto.fabricante.endereco.cidade = data.fabricante.endereco.cidade;
    }
    if (data.fabricante?.endereco?.pais !== undefined) {
      produto.fabricante.endereco.pais = data.fabricante.endereco.pais;
    }

    res.status(200).json(produto);
  } catch (e: unknown) {
    res.status(500).json({ message: (e as Error).message });
  }
}

export function removerProduto(req: Request, res: Response): void {
  try {
    const id: number = Number(req.params.id);
    const index = produtos.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Produto nao encontrado" });
      return;
    }

    const removido = produtos.splice(index, 1);
    res.status(200).json(removido[0]);
  } catch (e: unknown) {
    res.status(500).json({ message: (e as Error).message });
  }
}