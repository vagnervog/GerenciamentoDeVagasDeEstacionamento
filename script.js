    // Obter dados do formulário
    const tbody = document.querySelector('tbody');
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

    let items;

/*function cadastrarVaga() { 
    // Validar dados
    if (!descricao || !tipo || !numero) {
      alert('Preencha todos os campos!');
      return;
    }
  
    // Gerar ID autoincrement
    ultimoId++;
  
    // Criar objeto vaga
    const vaga = {
      id: ultimoId,
      descricao,
      tipo,
      numero,
    };
  
    // Simular requisição para API para salvar vaga
    // ...
  
    // Salvar vaga em localStorage
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    vagas.push(vaga);
    localStorage.setItem('vagas', JSON.stringify(vagas));
  
    // Limpar formulário
    formVaga.reset();
  
    // Carregar as vagas cadastradas
    carregarVagas();
  
    // Exibir mensagem de sucesso
    alert('Vaga cadastrada com sucesso!');
    console.log(vagas)
  }*/

  btnSalvar.onclick = () => {
    // Validar dados
    if (!descricao || !tipo || !numero) {
      alert('Preencha todos os campos!');
      return;
    }
  
    items.push({
      descricao: descricao.value,
      numero: numero.value,
      tipo: tipo.value,
    });
  
    setItensBD();
  
    loadItens();
  
    descricao.value = "";
    numero.value = "";
    tipo.value = "";
  };

  btnRegistrar.onclick = () => {
    // Validar dados
    if (!idVaga || !nomeCliente || !placa || !tipoVeiculo || !dataEntrada || !horaEntrada || !dataSaida || !horaSaida) {
      alert('Preencha todos os campos!');
      return;
    }
  
    items.push({
      idVaga: idRegistro.value,
      nomeCliente: nome.value,
      placa: placa.value,
      tipoVeiculo: tipoVeiculo.value,
      dataEntrada: dataEnt.value,
      horaEntrada: horaEnt.value,
      dataSaida: dataSai.value,
      horaSaida: horaSai.value,
    });
  
    setItensBD();
  
    loadItensRegistro();
  
    //descricao.value = "";
   // numero.value = "";
   // tipo.value = "";
  };

  function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
  }

  function insertItem(item, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${item.descricao}</td>
      <td>${item.numero}</td>
      <td>${item.tipo}</td>
      <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
  
    tbody.appendChild(tr);
  }

  function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
      insertItem(item, index);
    });
  }

  function loadItensRegistro() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
      insertItem(item, index);
    });
  }

  const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
  const setItensBD = () =>
  localStorage.setItem("db_items", JSON.stringify(items));

loadItens();
  
  