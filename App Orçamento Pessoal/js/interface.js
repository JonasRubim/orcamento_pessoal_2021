function cadastroDespesa() {
  let mes = document.getElementById("mes");
  let ano = document.getElementById("ano");
  let dia = document.getElementById("dia");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");
  let tipo = document.getElementById("tipo");

  const despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );
  if (despesa.validadorDados()) {
    bD.gravarDespesa(despesa);
    document.getElementById("titleModal").innerHTML = "PRONTO!";
    document.getElementById("titleModal").classList.add("text-success");
    document.getElementById("bodyModal").innerHTML =
      "Despesa cadastrada com sucesso!";
    document.getElementById("btn_modal").innerHTML = "Voltar";
    document.getElementById("btn_modal").classList.add("btn-success");
    // modal de Concluido
  } else {
    document.getElementById("titleModal").innerHTML =
      "Oops! Um erro foi encontrado...";
    document.getElementById("titleModal").classList.add("text-danger");
    document.getElementById("bodyModal").innerHTML =
      "Todos os Campos precisam ser preenchidos!";
    document.getElementById("btn_modal").innerHTML = "Voltar e Corrigir";
    document.getElementById("btn_modal").classList.add("btn-danger");
    // modal de Erro
  }
}

// Carregando as despesas no meu site
function carregarDespesa(despesas = []) {
  if (despesas.length === 0) {
    despesas = bD.recuperarListaDespesa();
  }

  let listarDespesas = document.querySelector(".listarDespesa");
  listarDespesas.innerHTML = "";
  despesas.forEach((desp) => {
    const linha = listarDespesas.insertRow();
    linha.insertCell(0).innerHTML = `${desp.dia}/${desp.mes}/${desp.ano}`;
    linha.insertCell(1).innerHTML = desp.tipo;
    linha.insertCell(2).innerHTML = desp.descricao;
    linha.insertCell(3).innerHTML = parseInt(desp.valor).toFixed(2);

    btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = "<i class='fas fa-minus-circle'></i>";
    let id = desp.id;
    btn.onclick = () => {
      bD.removerDespesa(id);
      carregarDespesa();
    };
    linha.insertCell(4).append(btn);
  });
}

function pesquisarDespesa() {
  let btn_pesquisa = document.getElementById("btn_pesquisa");
  btn_pesquisa.innerHTML =
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>";

  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  const despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  const despesas = bD.filtrarDespesa(despesa);
  setTimeout(() => {
    carregarDespesa(despesas);
    btn_pesquisa.innerHTML = "<i class='fas fa-search-plus'></i>";
  }, 2000);
}
