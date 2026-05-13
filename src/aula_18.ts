import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// --- Interfaces ---
interface Endereco {
  cidade: string;
  pais: string;
}

interface Fabricante {
  nome: string;
  endereco: Endereco;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  fabricante: Fabricante;
}

// --- Banco em memória ---
const produtos: Produto[] = [];

// --- POST /produtos - Cadastrar ---
app.post("/produtos", (req: Request, res: Response): void => {
  try {
    const data = req.body;

    if (!data.nome || !data.preco || !data.fabricante) {
      throw new Error("Produto requer nome, preco e fabricante");
    }
    if (data.preco <= 0) {
      throw new Error("Preco deve ser maior que zero");
    }
    if (!data.fabricante.nome) {
      throw new Error("Fabricante requer nome");
    }
    if (!data.fabricante.endereco?.cidade || !data.fabricante.endereco?.pais) {
      throw new Error("Endereco do fabricante requer cidade e pais");
    }
    if (produtos.find((p) => p.id === data.id)) {
      throw new Error("ID ja cadastrado");
    }

    const produto: Produto = {
      id: data.id,
      nome: data.nome,
      preco: data.preco,
      fabricante: data.fabricante,
    };

    produtos.push(produto);
    res.status(200).json(produto);
  } catch (e: unknown) {
    res.status(400).json({ Message: (e as Error).message });
  }
});

// --- GET /produtos - Listar todos ---
app.get("/produtos", (req: Request, res: Response): void => {
  res.status(200).json(produtos);
});

// --- GET /produtos/:id - Buscar por ID ---
app.get("/produtos/:id", (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      res.status(404).json({ Message: "Produto nao encontrado" });
      return;
    }

    res.status(200).json(produto);
  } catch (e: unknown) {
    res.status(500).json({ Message: (e as Error).message });
  }
});

// --- PUT /produtos/:id - Atualizar ---
app.put("/produtos/:id", (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id);
    const index = produtos.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ Message: "Produto nao encontrado" });
      return;
    }

    const data = req.body;
    const atual = produtos[index];

    produtos[index] = {
      id: atual.id,
      nome: data.nome ?? atual.nome,
      preco: data.preco ?? atual.preco,
      fabricante: {
        nome: data.fabricante?.nome ?? atual.fabricante.nome,
        endereco: {
          cidade: data.fabricante?.endereco?.cidade ?? atual.fabricante.endereco.cidade,
          pais: data.fabricante?.endereco?.pais ?? atual.fabricante.endereco.pais,
        },
      },
    };

    res.status(200).json(produtos[index]);
  } catch (e: unknown) {
    res.status(500).json({ Message: (e as Error).message });
  }
});

// --- DELETE /produtos/:id - Remover ---
app.delete("/produtos/:id", (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id);
    const index = produtos.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ Message: "Produto nao encontrado" });
      return;
    }

    const removido = produtos.splice(index, 1);
    res.status(200).json(removido[0]);
  } catch (e: unknown) {
    res.status(500).json({ Message: (e as Error).message });
  }
});

// --- Servidor ---
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});