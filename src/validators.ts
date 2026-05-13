export function validarProduto(data: any): void {
  if (data.id === undefined || !data.nome || data.preco === undefined || !data.fabricante) {
    throw new Error("Produto requer id, nome, preco e fabricante");
  }
  if (typeof data.id !== "number") {
    throw new Error("ID deve ser numerico");
  }
  if (typeof data.nome !== "string" || data.nome.trim() === "") {
    throw new Error("Nome do produto e obrigatorio");
  }
  if (typeof data.preco !== "number" || data.preco <= 0) {
    throw new Error("Preco deve ser maior que zero");
  }
  if (!data.fabricante.nome || data.fabricante.nome.trim() === "") {
    throw new Error("Fabricante requer nome");
  }
  if (!data.fabricante.endereco?.cidade || data.fabricante.endereco.cidade.trim() === "") {
    throw new Error("Cidade do fabricante e obrigatoria");
  }
  if (!data.fabricante.endereco?.pais || data.fabricante.endereco.pais.trim() === "") {
    throw new Error("Pais do fabricante e obrigatorio");
  }
}