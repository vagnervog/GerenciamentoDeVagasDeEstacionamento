    // Obter dados do formulário (variáveis)
    const tbodyV = document.querySelector('#tableVagas tbody');
    const tbodyR = document.querySelector('#tableReserva tbody');
    const descricao = document.querySelector('#descricao');
    const tipo = document.querySelector('#tipo');
    const numero = document.querySelector('#numero');
    const btnSalvar = document.querySelector('#btnSalvar');
    const idRegistro = idAtualVaga = 1;
    const nome = document.querySelector('#nomeCliente');
    const placa = document.querySelector('#placa');
    const tipoVeiculo = document.querySelector('#tipoVeiculo');
    const dataEnt = document.querySelector('#dataEntrada');
    const dataSai = document.querySelector('#dataSaida');
    const btnRegistrar = document.querySelector('#btnRegistrar');
    
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
    alert("Vaga cadastrada com sucesso!");
  };

  function limparCamposVagas() {
    // limpa os campos
    descricao.value = "";
    numero.value = "";
    tipo.value = "";
  }

  function deleteItem(index) {
    if (confirm("Você deseja excluir esta vaga?")){
    items.splice(index, 1);
    setItensBDV();
    loadItensVaga();
    } 
  }

  function deleteItemRegistro(index) {
    if (confirm("Você deseja excluir esta reserva?")){
    itemsr.splice(index, 1);
    setItensBDR();
    loadItensRegistro();
    }
  }

  // seta os dados na tabela de vagas
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
    if (!idVaga.value || !nomeCliente.value || !placa.value || !tipoVeiculo.value || !dataEntrada.value || !dataSaida.value) {
      alert('Preencha todos os campos!');
      return;
    }    
    // adiciona os valores ao array
    itemsr.push({
      idVaga: idAtualVaga++,
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

  function limparCamposRegistros(){
        // limpa os campos
        nomeCliente.value = "";
        tipoVeiculo.value = "";
        dataEntrada.value = "";
        dataEntrada.value = "";
        dataSaida.value = "";
  }

  // insere os dados na tabela de registros
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

  // carrega os dados do json
  function loadItensRegistro() {
    itemsr = getItensBDR();
    tbodyR.innerHTML = "";
    itemsr.forEach((itemsr, index) => {
      insertItemRegistro(itemsr, index);
    });
  }
    // armazena os dados no localStorage atraves de um json
    const getItensBDV = () => JSON.parse(localStorage.getItem("db_vagas")) ?? [];
    const setItensBDV = () => localStorage.setItem("db_vagas", JSON.stringify(items));
    const getItensBDR = () => JSON.parse(localStorage.getItem("db_registros")) ?? [];
    const setItensBDR = () => localStorage.setItem("db_registros", JSON.stringify(itemsr));

  loadItensVaga();
  loadItensRegistro();
  
  