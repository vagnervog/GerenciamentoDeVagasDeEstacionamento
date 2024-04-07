    // Obter dados do formulário (variáveis)
    const tbodyV = document.querySelector('#tbodyVagas tbody');
    const tbodyR = document.querySelector('#tableReserva tbody');
    const descricao = document.querySelector('#descricao');
    const tipo = document.querySelector('#tipo');
    const numero = document.querySelector('#numero');
    const btnSalvar = document.querySelector('#btnSalvar');
    const idRegistro = document.querySelector('#idVaga');
    const nome = document.querySelector('#nomeCliente');
    const placa = document.querySelector('#placa');
    const tipoVeiculo = document.querySelector('#tipoVeiculo');
    const dataEnt = document.querySelector('#dataEntrada');
    const dataSai = document.querySelector('#dataSaida');
    const btnRegistrar = document.querySelector('#btnRegistrar');
    let idAtualVaga = 0;
    let itemVaga;
    let itemRegistro;

    function gerarId() {
      return ++idAtual;
    }

    //função para o botão salvar - ação de click do mouse
  btnSalvar.onclick = () => {  
    // Validar dados - se campos estão preenchidos
    if (!descricao.value || !tipo.value || !numero.value) {
      alert('Preencha todos os campos!');
      return;
    }
    // adiciona os valores ao array
    items.push({
      descricao: descricao.value,
      numero: numero.value,
      tipo: tipo.value,
    });       
    setItensBDV();
    loadItensVaga();
    limparCamposVagas();
  };

  function limparCamposVagas() {
    // limpa os campos
    descricao.value = "";
    numero.value = "";
    tipo.value = "";
  }

  function deleteItem(index) {
    items.splice(index, 1);
    setItensBDV();
    loadItensVaga();
  }

  // seta os dados na tabela de vagas
  function insertItemVaga(items, index) {
    let tbody = document.createElement("tbody");
        // Cria a tabela HTML
    tbody.innerHTML = `
      <td>${items.descricao}</td>
      <td>${items.numero}</td>
      <td>${items.tipo}</td>
      <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
      tbodyV.appendChild(tbody);
  }

  
  // carrega os itens salvos no json
  function loadItensVaga() {
    items = getItensBDV();
    tbodyV.innerHTML = "";
    items.forEach((items, index) => {
      insertItemVaga(items, index);
    });
  }

  //função para o botão registrar - ação de click do mouse 
  btnRegistrar.onclick = () => {

    // Validar dados
    if (!idVaga.value || !nomeCliente.value || !placa.value || !tipoVeiculo.value || !dataEntrada.value || !horaEntrada.value || !dataSaida.value || !horaSaida.value) {
      alert('Preencha todos os campos!');
      return;
    }
    
    // adiciona os valores ao array
    items.push({
      //idVaga: gerarId(),
      nomeCliente: nome.value,
      placa: placa.value,
      tipoVeiculo: tipoVeiculo.value,
      dataEntrada: dataEnt.value,
      dataSaida: dataSai.value,
    });
  
    setItensBDR();
  
    loadItensRegistro();
    // limpa os campos
    nomeCliente.value = "";
    tipoVeiculo.value = "";
    dataEntrada.value = "";
    dataEntrada.value = "";
    dataSaida.value = "";
  };

  // insere os dados na tabela de registros
  function insertItemRegistro(itemRegistro, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${itemRegistro.idVaga}</td>
      <td>${itemRegistro.placa}</td>
      <td>${itemRegistro.tipoVeiculo}</td>
      <td>${itemRegistro.dataEntrada}</td>
      <td>${itemRegistro.dataSaida}</td>
      <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    tbodyR.appendChild(tr);
  }

  // carrega os dados do json
  function loadItensRegistro() {
    items = getItensBDR();
    tbodyR.innerHTML = "";
    items.forEach((itemRegistro, index) => {
      insertItemRegistro(itemRegistro, index);
    });
  }
    // armazena os dados no localStorage atraves de um json
    const getItensBDV = () => JSON.parse(localStorage.getItem("db_vagas")) ?? [];
    const setItensBDV = () => localStorage.setItem("db_vagas", JSON.stringify(items));
    const getItensBDR = () => JSON.parse(localStorage.getItem("db_registros")) ?? [];
    const setItensBDR = () => localStorage.setItem("db_registros", JSON.stringify(items));

  loadItensVaga();
  loadItensRegistro();

  