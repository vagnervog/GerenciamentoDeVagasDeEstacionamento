function cadastrarVaga() {
    // Obter dados do formulário
    const descricao = document.getElementById('descricao').value;
    const tipo = document.getElementById('tipo').value;
    const numero = document.getElementById('numero').value;
  
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
  }

  function carregarVagas(vaga) {
    // Obter referência à tabela
    const tableVagas = document.getElementById('table-vagas');
  
    // Criar linha da tabela
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vaga.id}</td>
      <td>${vaga.tipo}</td>
      <td>${vaga.numero}</td>
      <td>${vaga.descricao}</td>
    `;
  
    // Adicionar linha à tabela
    tableVagas.tBodies[0].appendChild(tr);
  }
  
  