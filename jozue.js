// Função principal para iniciar o programa e apresentar o menu de opções ao usuário
function iniciarPrograma() {
    while (true) {
      const escolha = parseInt(prompt(`Escolha uma opção:\n1. Cadastrar Sala\n2. Agendar Reserva\n3. Visualizar Agendamentos\n4. Buscar Agendamento por ID\n5. Editar Agendamento\n6. Excluir Agendamento\n7. Sair`));
  
      switch (escolha) {
        case 1:
          cadastrarSala();
          break;
        case 2:
          agendarReserva();
          break;
        case 3:
          visualizarAgendamentos();
          break;
        case 4:
          buscarAgendamentoPorId();
          break;
        case 5:
          editarAgendamento();
          break;
        case 6:
          excluirAgendamento();
          break;
        case 7:
          return;
        default:
          alert('Opção inválida. Tente novamente.');
      }
    }
  }
  
  // Função para cadastrar uma nova sala
  function cadastrarSala() {
    const numeroSala = prompt('Digite o número da sala:');
    const descricao = prompt('Digite a descrição da sala:');
    const novaSala = { numeroSala, descricao };
  
    // Obter salas cadastradas da sessão do navegador
    let salas = JSON.parse(sessionStorage.getItem('salas')) || [];
    salas.push(novaSala);
  
    // Armazenar salas atualizadas na sessão do navegador
    sessionStorage.setItem('salas', JSON.stringify(salas));
  
    alert('Sala cadastrada com sucesso!');
  }
  
  // Função para agendar uma nova reserva
  function agendarReserva() {
    const numeroSala = prompt('Digite o número da sala:');
    const data = prompt('Digite a data da reserva (Formato: YYYY-MM-DD):');
    const horario = prompt('Digite o horário da reserva (Formato: HH:MM):');
  
    const reserva = { numeroSala, data, horario };
  
    // Obter reservas agendadas da sessão do navegador
    let reservas = JSON.parse(sessionStorage.getItem('reservas')) || [];
    
    // Verificar disponibilidade da sala
    const disponivel = reservas.every(r => {
      return !(r.numeroSala === reserva.numeroSala && r.data === reserva.data && r.horario === reserva.horario);
    });
  
    if (!disponivel) {
      alert('vaga não disponível nesse horário.');
      return;
    }
  
    reservas.push(reserva);
  
    // Armazenar reservas atualizadas na sessão do navegador
    sessionStorage.setItem('reservas', JSON.stringify(reservas));
  
    alert('Reserva agendada com sucesso!');
  }
  
  // Função para listar todos os agendamentos
  function visualizarAgendamentos() {
    const reservas = JSON.parse(sessionStorage.getItem('reservas')) || [];
    
    if (reservas.length === 0) {
      alert('Nenhum agendamento encontrado.');
      return;
    }
  
    let lista = 'Agendamentos:\n';
    reservas.forEach((reserva, index) => {
      lista += `${index + 1}. Sala ${reserva.numeroSala}, Data: ${reserva.data}, Horário: ${reserva.horario}\n`;
    });
  
    alert(lista);
  }
  
  // Função para buscar um agendamento específico pelo ID
  function buscarAgendamentoPorId() {
    const id = parseInt(prompt('Digite o ID do agendamento:'));
    const reservas = JSON.parse(sessionStorage.getItem('reservas')) || [];
  
    if (id <= 0 || id > reservas.length) {
      alert('ID inválido.');
      return;
    }
  
    const reserva = reservas[id - 1];
    alert(`Sala ${reserva.numeroSala}, Data: ${reserva.data}, Horário: ${reserva.horario}`);
  }
  
  // Função para editar um agendamento
  function editarAgendamento() {
    const id = parseInt(prompt('Digite o ID do agendamento que deseja editar:'));
    const reservas = JSON.parse(sessionStorage.getItem('reservas')) || [];
  
    if (id <= 0 || id > reservas.length) {
      alert('ID inválido.');
      return;
    }
  
    const novaData = prompt('Digite a nova data da reserva (Formato: YYYY-MM-DD):');
    const novoHorario = prompt('Digite o novo horário da reserva (Formato: HH:MM):');
  
    reservas[id - 1].data = novaData;
    reservas[id - 1].horario = novoHorario;
  
    sessionStorage.setItem('reservas', JSON.stringify(reservas));
    alert('Agendamento editado com sucesso!');
  }
  
  // Função para excluir um agendamento
  function excluirAgendamento() {
    const id = parseInt(prompt('Digite o ID do agendamento que deseja excluir:'));
    const reservas = JSON.parse(sessionStorage.getItem('reservas')) || [];
  
    if (id <= 0 || id > reservas.length) {
      alert('ID inválido.');
      return;
    }
  
    reservas.splice(id - 1, 1);
  
    sessionStorage.setItem('reservas', JSON.stringify(reservas));
    alert('Agendamento excluído com sucesso!');
  }
  
  // Iniciar o programa
  iniciarPrograma();