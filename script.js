    // Obter dados do formulário (variáveis)
    const tbodyV = document.querySelector('#tableVagas tbody');
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
    const horaEnt = document.querySelector('#horaEntrada');
    const dataSai = document.querySelector('#dataSaida');
    const horaSai = document.querySelector('#horaSaida');
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
    const disponivel = reservas.every(r => {
      return !(r.numeroSala === reserva.numeroSala && r.data === reserva.data && r.horario === reserva.horario);
    });
  
    if (!disponivel) {
      alert('vaga não disponível nesse horário.');
      return;
    }
  
    reservas.push(reserva);
  
    setItensBDV();
    loadItensVaga();

    // limpa os campos
    descricao.value = "";
    numero.value = "";
    tipo.value = "";
  };

  function deleteItem(index) {
    items.splice(index, 1);
    setItensBDV();
    loadItensVaga();
  }

  // seta os dados na tabela de vagas
  function insertItemVaga(itemVaga, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${itemVaga.descricao}</td>
      <td>${itemVaga.numero}</td>
      <td>${itemVaga.tipo}</td>
      <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
      tbodyV.appendChild(tr);
  }

  // carrega os itens salvos no json
  function loadItensVaga() {
    items = getItensBDV();
    tbodyV.innerHTML = "";
    items.forEach((itemVaga, index) => {
      insertItemVaga(itemVaga, index);
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
      horaEntrada: horaEnt.value,
      dataSaida: dataSai.value,
      horaSaida: horaSai.value,
    });
  
    setItensBDR();
  
    loadItensRegistro();
    // limpa os campos
    nomeCliente.value = "";
    tipoVeiculo.value = "";
    dataEntrada.value = "";
    dataEntrada.value = "";
    horaEntrada.value = "";
    dataSaida.value = "";
    horaSaida.value = "";
  };

  // insere os dados na tabela de registros
  function insertItemRegistro(itemRegistro, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${itemRegistro.idVaga}</td>
      <td>${itemRegistro.placa}</td>
      <td>${itemRegistro.tipoVeiculo}</td>
      <td>${itemRegistro.dataEntrada}</td>
      <td>${itemRegistro.horaEntrada}</td>
      <td>${itemRegistro.dataSaida}</td>
      <td>${itemRegistro.horaSaida}</td>
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
  
  