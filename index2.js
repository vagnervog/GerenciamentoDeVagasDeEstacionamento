const estacionamento = {
    vagas: [], // Matriz para armazenar objetos de vagas de estacionamento
    vagaOcupada: 0, // Mantém o controle dos lugares atualmente ocupados
    valorHora: 2.00, // Taxa de estacionamento por hora
  
    // Função para inicializar vagas de estacionamento (modifique o número conforme necessário)
    inicializarVagas(numeroDeVagas) {
      for (let i = 0; i < numeroDeVagas; i++) {
        this.vagas.push({
          id: i + 1,
          ocupada: false,
          placaCarro: null, // Placa do carro estacionado
          tempoDeEntrada: null, // Hora em que o carro entrou no local
        });
      }
    },
  
    // Função para encontrar uma vaga de estacionamento disponível
    buscarVagaDisponivel() {
      for (const vaga of this.vagas) {
        if (!vaga.ocupada) {
          return vaga;
        }
      }
      return null;
    },
  
    // Função para estacionar um carro
    estacionarCarro(placaCarro) {
      const vagaDisponivel = this.buscarVagaDisponivel();
      if (vagaDisponivel) {
        vagaDisponivel.ocupada = true;
        vagaDisponivel.placaCarro = placaCarro;
        vagaDisponivel.tempoDeEntrada = new Date(); // Registrar horário de entrada
        this.vagaOcupada++;
        alert(`Carro com placa ${placaCarro} estacionado na vaga ${vagaDisponivel.id}!`);
      } else {
        alert("Não há vagas disponíveis no momento.");
      }
    },
  
    // Função para remover um carro (não é possível remover lugares ocupados)
    removerCarro(vagaId) {
      const vaga = this.vagas.find((vaga) => vaga.id === vagaId);
      if (vaga && !vaga.ocupada) {
        vaga.ocupada = false;
        vaga.placaCarro = null;
        vaga.tempoDeEntrada = null;
        this.vagaOcupada--;
        alert(`Vaga ${vagaId} liberada!`);
      } else if (vaga && vaga.ocupada) {
        alert("Não é possível remover um carro de uma vaga ocupada!");
      } else {
        alert("Vaga inexistente!");
      }
    },
  
    // Função para calcular a taxa de estacionamento com base no tempo estacionado
    calculaValor(vaga) {
      if (!vaga.ocupada || !vaga.tempoDeEntrada) return 0;
      const tempoEstacionado = (new Date() - vaga.tempoDeEntrada) / (1000 * 60 * 60); // Converter para horas
      return Math.ceil(tempoEstacionado) * this.valorHora; // Arredondar para a hora mais próxima
    },
  
    // Função para exibir a taxa de estacionamento para uma vaga específica
    mostrarValor(vagaId) {
      const vaga = this.vagas.find((vaga) => vaga.id === vagaId);
      if (vaga) {
        const valor = this.calculaValor(vaga);
        if (valor > 0) {
          alert(`O valor total para a vaga <span class="math-inline">\{vagaId\} é de R</span>${valor.toFixed(2)}`);
        } else {
          alert("Não há cobrança para esta vaga.");
        }
      } else {
        alert("Vaga inexistente!");
      }
    },
  
    // Função para exibir um resumo de todas as vagas de estacionamento
    mostrarResumoVagas() {
      let mensagem = "**Resumo do Estacionamento:**\n";
      mensagem += `Vagas disponíveis: ${this.vagas.length - this.vagaOcupada}\n`;
      mensagem += `Vagas ocupadas: ${this.vagaOcupada}\n\n`;
      for (const vaga of this.vagas) {
        mensagem += `Vaga ${vaga.id}: `;
        if (vaga.ocupada) {
          mensagem += `Ocupada (Placa: ${vaga.placaCarro})\n`;
        } else {
          mensagem += "Disponível\n";
        }
      }
      alert(mensagem);
    },
  };
  
  // Inicialize vagas de estacionamento (substitua pelo número desejado)
  estacionamento.inicializarVagas(10);
  
  // Exemplo de uso (substitua por botões/eventos em seu HTML)
  function estacionarUmCarro() {
    const placaCarro = prompt("Digite a placa do carro:");
    estacionamento.estacionarCarro(placaCarro);
  }
  
  function removerUmCarro() {
    const vagaId = parseInt(prompt("Digite o ID da vaga a ser liberada:"));
    estacionamento.removerCarro(vagaId);
  }
  
  function mostrarValorForvaga(){

  }
  