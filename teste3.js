// Array para armazenar as informações das vagas
let vagas = [];

// Função para buscar uma vaga pelo ID
function buscarVagaPorId(id) {
  return vagas.find(vaga => vaga.id === id);
}

// Classe Vaga
class Vaga {
  constructor(id) {
    this.id = id;
    this.ocupada = false;
    this.horaEntrada = null;
  }

  ocupar() {
    this.ocupada = true;
    this.horaEntrada = new Date();
  }

  desocupar() {
    this.ocupada = false;
    this.horaEntrada = null;
  }

  calcularCustoTotal() {
    if (this.horaEntrada === null) {
      return 0;
    }

    const horaSaida = new Date();
    const tempoEstacionadoMs = horaSaida - this.horaEntrada;
    const tempoEstacionadoHoras = tempoEstacionadoMs / (1000 * 60 * 60);
    const custoTotal = Math.ceil(tempoEstacionadoHoras) * 2; // R$ 2 por hora

    return custoTotal;
  }
}

// Função para inicializar o sistema
function inicializar() {
  // Adicionar event listeners aos botões
  document.getElementById('adicionar-vaga').addEventListener('click', adicionarVaga);
  document.getElementById('remover-vaga').addEventListener('click', removerVaga);
  document.getElementById('registrar-entrada').addEventListener('click', registrarEntrada);
  document.getElementById('registrar-saida').addEventListener('click', registrarSaida);

  // Inicializar as vagas
  inicializarVagas();
}

// Função para inicializar as vagas (criar vagas de 1 a 10)
function inicializarVagas() {
  for (let i = 1; i <= 10; i++) {
    const novaVaga = new Vaga(i);
    vagas.push(novaVaga);
  }

  atualizarVagasInfo();
}

// Função para atualizar as informações das vagas na interface
function atualizarVagasInfo() {
  const vagasInfoElemento = document.getElementById('vagas-info');
  vagasInfoElemento.innerHTML = '';

  vagas.forEach(vaga => {
    const vagaElemento = document.createElement('div');
    vagaElemento.textContent = `Vaga ${vaga.id}: ${vaga.ocupada ? 'Ocupada' : 'Disponível'}`;
    vagasInfoElemento.appendChild(vagaElemento);
  });
}

// Função para adicionar uma vaga
function adicionarVaga() {
  const idVaga = document.getElementById('idVaga').value.trim();
  if (idVaga === '') {
    alert('Por favor, informe um ID para a vaga.');
    return;
  }

  if (buscarVagaPorId(parseInt(idVaga))) {
    alert('Já existe uma vaga com este ID.');
    return;
  }

  const novaVaga = new Vaga(parseInt(idVaga));
  vagas.push(novaVaga);
  atualizarVagasInfo();
}

// Função para remover uma vaga
function removerVaga() {
  const idVaga = document.getElementById('idVaga').value.trim();
  if (idVaga === '') {
    alert('Por favor, informe um ID para a vaga.');
    return;
  }

  const vaga = buscarVagaPorId(parseInt(idVaga));
  if (!vaga) {
    alert('Não existe uma vaga com este ID.');
    return;
  }

  if (vaga.ocupada) {
    alert('Não é possível remover uma vaga ocupada.');
    return;
  }

  vagas = vagas.filter(v => v.id !== parseInt(idVaga));
  atualizarVagasInfo();
}

// Função para registrar a entrada de um carro na vaga
function registrarEntrada() {
  const idVaga = document.getElementById('idVagaEntrada').value.trim();
  if (idVaga === '') {
    alert('Por favor, informe um ID para a vaga.');
    return;
  }

  const vaga = buscarVagaPorId(parseInt(idVaga));
  if (!vaga) {
    alert('Não existe uma vaga com este ID.');
    return;
  }

  if (vaga.ocupada) {
    alert('Esta vaga já está ocupada.');
    return;
  }

  vaga.ocupar();
  atualizarVagasInfo();
}

// Função para registrar a saída de um carro da vaga e calcular o custo total
function registrarSaida() {
  const idVaga = document.getElementById('idVagaEntrada').value.trim();
  if (idVaga === '') {
    alert('Por favor, informe um ID para a vaga.');
    return;
  }

  const vaga = buscarVagaPorId(parseInt(idVaga));
  if (!vaga) {
    alert('Não existe uma vaga com este ID.');
    return;
  }

  if (!vaga.ocupada) {
    alert('Esta vaga não está ocupada.');
    return;
  }

  const custoTotal = vaga.calcularCustoTotal();
  alert(`Custo total devido pelo motorista: R$ ${custoTotal.toFixed(2)}`);
  
  vaga.desocupar();
  atualizarVagasInfo();
}

// Inicializar o sistema ao carregar a página
document.addEventListener('DOMContentLoaded', inicializar);

let entradaTimestamp = null;
let custoAcumulado = 0;
let timerInterval = null;

// Função para registrar a entrada de um carro
document.getElementById('registrar-entrada').addEventListener('click', () => {
  entradaTimestamp = Date.now(); // Salva o timestamp de entrada
  iniciarContagem();
});

// Função para iniciar a contagem do tempo decorrido
function iniciarContagem() {
  timerInterval = setInterval(atualizarTempoDecorrido, 1000); // Atualiza a cada segundo
}

// Função para registrar a saída de um carro
document.getElementById('registrar-saida').addEventListener('click', () => {
  if (entradaTimestamp === null) {
    alert("Você ainda não registrou a entrada do veículo.");
    return;
  }

  clearInterval(timerInterval); // Para a contagem

  const tempoDecorridoSegundos = Math.floor((Date.now() - entradaTimestamp) / 1000);
  const custoTotal = calcularCusto(tempoDecorridoSegundos);

  alert(`Tempo decorrido: ${formatarTempo(tempoDecorridoSegundos)}\nCusto total: R$ ${custoTotal.toFixed(2)}`);

  // Reinicia para próximos registros
  entradaTimestamp = null;
  custoAcumulado = 0;
  atualizarTempoDecorrido();
  atualizarCustoAcumulado();
});

// Função para atualizar o tempo decorrido na interface
function atualizarTempoDecorrido() {
  if (entradaTimestamp !== null) {
    const tempoDecorridoSegundos = Math.floor((Date.now() - entradaTimestamp) / 1000);
    document.getElementById('tempoDecorrido').textContent = `${formatarTempo(tempoDecorridoSegundos)}`;
  } else {
    document.getElementById('tempoDecorrido').textContent = `0 segundos`;
  }
}

// Função para formatar o tempo em horas, minutos e segundos
function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;
  return `${horas}h ${minutos}m ${segundosRestantes}s`;
}

// Função para calcular o custo com base no tempo decorrido
function calcularCusto(tempoDecorridoSegundos) {
  const minutosDecorridos = Math.ceil(tempoDecorridoSegundos / 60);

  if (minutosDecorridos <= 60) {
    custoAcumulado += 4; // Primeira hora
  } else {
    const horasCompletas = Math.floor(minutosDecorridos / 60);
    const minutosAdicionais = minutosDecorridos % 60;
    custoAcumulado += (horasCompletas * 2) + (minutosAdicionais * 2);
  }

  atualizarCustoAcumulado();
  return custoAcumulado;
}

// Função para atualizar o custo acumulado na interface
function atualizarCustoAcumulado() {
  document.getElementById('custoAcumulado').textContent = custoAcumulado.toFixed(2);
}
