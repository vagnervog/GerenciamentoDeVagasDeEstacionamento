const btnSalvar = document.querySelector('#btnSalvar');
const btnRegistrar = document.querySelector('#btnRegistrar');

btnSalvar.onclick = function () {
    const dadosVaga = {
        descricao: document.querySelector('#descricao'),
        tipo: document.querySelector('#tipo'),
        numero: document.querySelector('#numero'),
    };
  
    if (!descricao || !tipo || !numero) {
        alert('Preencha todos os campos!');
        return;
    };

    const salvarDadosVaga = (dados) => {
        JSON.parse(localStorage.getItem("dadosVaga")) ?? [];
        localStorage.setItem("dadosVaga", JSON.stringify(dados));
    };
  
    salvarDadosVaga(dadosVaga);
  };