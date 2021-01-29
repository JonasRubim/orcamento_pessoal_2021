class Despesa {
  // tranformando em Objeto os dados recebidos
  constructor(ano, mes, dia, tipo, descricao, valor) {
    (this.ano = ano),
      (this.mes = mes),
      (this.dia = dia),
      (this.tipo = tipo),
      (this.descricao = descricao),
      (this.valor = valor);
  }
  validadorDados() {
    for (let i in this) {
      if (this[i] === undefined || this[i] === null || this[i] === "") {
        return false;
      }
    }
    return true;
  }
}

class BancoDados {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }
  // Adicionando proximo ID
  getProximoId() {
    let proximoID = localStorage.getItem("id");
    return Number(proximoID) + 1;
  }
  // Gravando as Despesas no LocalStorage
  gravarDespesa(desp) {
    let id = this.getProximoId();
    localStorage.setItem("id", id);
    localStorage.setItem(id, JSON.stringify(desp));
  }
  recuperarListaDespesa() {
    let id = localStorage.getItem("id");
    let despesas = [];

    for (let i = 0; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i));
      if (despesa === null) {
        continue;
      }
      despesa.id = i;
      despesas.push(despesa);
    }
    return despesas;
  }
  filtrarDespesa(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarListaDespesa();

    if (despesa.ano != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }
    if (despesa.tipo != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }
    if (despesa.descricao != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    if (despesa.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }
    return despesasFiltradas;
  }

  removerDespesa(id) {
    localStorage.removeItem(id);
  }
}

let bD = new BancoDados();
