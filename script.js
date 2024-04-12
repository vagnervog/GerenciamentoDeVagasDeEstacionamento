// Obter dados do formulário (variáveis)
const tbodyV = document.querySelector('#tableVagas tbody');
const tbodyR = document.querySelector('#tableReserva tbody');
const tbodyB = document.querySelector('#tableBusca tbody');
const descricao = document.querySelector('#descricao');
const tipo = document.querySelector('#tipo');
const numero = document.querySelector('#numero');
const btnSalvar = document.querySelector('#btnSalvar');
const nome = document.querySelector('#nomeCliente');
const placa = document.querySelector('#placa');
const tipoVeiculo = document.querySelector('#tipoVeiculo');
const dataEnt = document.querySelector('#dataEntrada');
const dataSai = document.querySelector('#dataSaida');
const btnRegistrar = document.querySelector('#btnRegistrar');
const btnBuscar = document.querySelector('#btnBuscar');

//FUNÇÕES FORMULÁRIO 'CADASTRO DE VAGAS DE ESTACIONAMENTO'

// Função para o botão salvar - ação de click do mouse
btnSalvar.onclick = () => {
  // Validar dados - se campos estão preenchidos
  if (!descricao.value || !tipo.value || !numero.value) {
    alert('Preencha todos os campos!');
    return;
  }
  // Adiciona os valores ao array
  items.push({
    descricao: descricao.value,
    numero: numero.value,
    tipo: tipo.value,
  });
  setItensBDV();
  loadItensVaga();
  limparCamposVagas();
  alert("Vaga cadastrada com sucesso!");
};

// Limpa os campos
function limparCamposVagas() {
  descricao.value = "";
  numero.value = "";
  tipo.value = "";
}

// Deleta a vaga 
function deleteItem(index) {
  if (confirm("Você deseja excluir esta vaga?")) {
    items.splice(index, 1);
    setItensBDV();
    loadItensVaga();
  }
}

// Seta os dados na tabela de vagas
function insertItemVaga(items, index) {
  let tr = document.createElement("tr");
  // Cria a tabela HTML
  tr.innerHTML = `
      <td>${items.numero}</td>
      <td>${items.tipo}</td>
      <td>${items.descricao}</td>
      <td>
        <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    `;
  tbodyV.appendChild(tr);
}

// Carrega na tabela os itens salvos no json
function loadItensVaga() {
  items = getItensBDV();
  tbodyV.innerHTML = "";
  items.forEach((items, index) => {
    insertItemVaga(items, index);
  });
}

// Função para gerar ID auto increment para as reservas
function gerarIdVaga() {
  // Armazena o valor atual do ID na variável "idAtualVaga"
  let idAtualVaga = parseInt(localStorage.getItem("ultimoIdVaga")) || 0;
  // Incrementa o valor da variável "idAtualVaga"
  idAtualVaga++;
  // Salva o novo valor do ID no localStorage
  localStorage.setItem("ultimoIdVaga", idAtualVaga);
  // Retorna o novo valor do ID
  return idAtualVaga;
}

//FUNÇÕES FORMULÁRIO 'GERENCIAMENTO DE VAGAS DE ESTACINAMENTO'

// Função para o botão registrar - ação de click do mouse 
btnRegistrar.onclick = () => {
  // Validar dados
  if (!idVaga.value || !nomeCliente.value || !placa.value || !tipoVeiculo.value || !dataEntrada.value || !dataSaida.value) {
    alert('Preencha todos os campos!');
    return;
  }
  // Adiciona os valores ao array
  itemsr.push({
    idVaga: gerarIdVaga(),
    nome: nomeCliente.value,
    placa: placa.value,
    tipoVeiculo: tipoVeiculo.value,
    dataEntrada: dataEnt.value,
    dataSaida: dataSai.value
  });
  setItensBDR();
  loadItensRegistro();
  limparCamposRegistros();
  alert("Reserva cadastrada com sucesso!");
};

// Limpa os campos
function limparCamposRegistros() {
  nomeCliente.value = "";
  tipoVeiculo.value = "";
  dataEntrada.value = "";
  dataEntrada.value = "";
  dataSaida.value = "";
}

// Insere os dados na tabela de registros
function insertItemRegistro(itemsr, index) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
      <td>${itemsr.idVaga}</td>
      <td>${itemsr.nome}</td>
      <td>${itemsr.placa}</td>
      <td>${itemsr.tipoVeiculo}</td>
      <td>${itemsr.dataEntrada}</td>
      <td>${itemsr.dataSaida}</td>
      <td>
        <button onclick="deleteItemRegistro(${index})"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    `;
  tbodyR.appendChild(tr);
}

// Carrega na tabela os dados do json
function loadItensRegistro() {
  itemsr = getItensBDR();
  tbodyR.innerHTML = "";
  itemsr.forEach((itemsr, index) => {
    insertItemRegistro(itemsr, index);
  });
}

// Faz a busca da reserva pelo ID
function buscarItemPorId() {
  const idRegistro = Number(document.querySelector("#idRegistro").value);
  const registros = JSON.parse(localStorage.getItem("db_registros")) ?? [];
  const registroEncontrado = registros.find((registro) => registro.idVaga === idRegistro);
    if (!registroEncontrado) {
    alert(`Reserva não encontrada!`);
    return;
  }
  alert(`Reserva encontrada!`);

// Limpa o conteúdo anterior da tabela de busca
  tbodyB.innerHTML = "";
  const linha = document.createElement('tr');
  for (const propriedade of Object.keys(registroEncontrado)) {
    const valor = registroEncontrado[propriedade];
    const celula = document.createElement('td');
    celula.textContent = valor;
    linha.appendChild(celula);
  }
  tbodyB.appendChild(linha);  
}

// Executa a função a partir do momento que o botão for clicado
btnBuscar.onclick = (event) => {
  event.preventDefault(); // Impede a recarga da página
  buscarItemPorId();
};

// Deleta a reserva
function deleteItemRegistro(index) {
  if (confirm("Você deseja excluir esta reserva?")) {
    itemsr.splice(index, 1);
    setItensBDR();
    loadItensRegistro();
  }
}

// Armazena os dados no localStorage atraves de um json
const getItensBDV = () => JSON.parse(localStorage.getItem("db_vagas")) ?? [];
const setItensBDV = () => localStorage.setItem("db_vagas", JSON.stringify(items));
const getItensBDR = () => JSON.parse(localStorage.getItem("db_registros")) ?? [];
const setItensBDR = () => localStorage.setItem("db_registros", JSON.stringify(itemsr));

//Inicia a tela carregando os dados armazenados no localStorage nas tabelas
loadItensVaga();
loadItensRegistro();

