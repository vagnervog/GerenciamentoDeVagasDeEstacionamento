# GerenciamentoDeVagasDeEstacionamento
Atividade do curso RSTI-DI: Desenvolvimento de sistema web de gerenciamento de vagas de estacionamento em javaScript/HTML/CSS

Formato de estacionamento mensal
# Levantamento de requisitos
DEFINIÇÕES PARA USUÁRIO DO SISTEMA:

O sistema será liberado para tipo usuário Administrador, que poderá fazer cadastro e gerenciameto de vagas.

MENU INICIAL

- Cadastrar um novo cliente e seu veículo em uma vaga;
- Gerenciar as vagas ocupadas;
- Cadastrar vagas;
- Sair do sistema.

FAZER CADASTRO DE ENTRADA DE VEÍCULO

Permitir ao usuário fazer a reserva de uma vaga:

- Optar pelo tipo de vaga;
- Ao escolher um tipo, o sistema apresenta as vagas disponíveis – pré cadastradas e que não estão ocupadas;
- Escolher uma vaga - inserir o ID (da vaga que o usuário escolheu) num campo específico;
- Inserir ID da vaga, nome, placa e tipo de veículo num campo específico;
- Informar a data e hora de entrada e date e hora de saída em campo específico, gravar – ao gravar o sistema deve exibir o número da reserva – um ID;

GERENCIAMENTO DE VAGAS

Permitir ao usuário gerenciar as vagas:
- Sistema lista todas as vagas ocupadas;
- Sistema deve possibilitar buscar uma reserva de vaga pelo ID (informado pelo sistema ao gravar);
- Acessar as informações do cliente daquela vaga – o sistema busca os dados através do ID informado pelo usuário;
- Editar a reserva de vaga – o usuário poderá alterar as informações dos campos: data, hora e / ou vaga (ID da vaga);
- Excluir a reserva – buscar a reserva e deletar;

CADASTRAR TIPOS DE VAGAS:

Permitir que o usuário insira no sistema dados de uma vaga, edite e exclua um cadastro:
- O usuário deverá cadastrar as vagas informando: o tipo (coberta, não coberta, idoso ou deficiente), o número da vaga e a descrição(especificar se a vaga é para carro ou moto);
- O sistema deve exibir em uma tabela as vagas cadastradas;
- O administrador terá as opções de excluir ou editar uma vaga cadastrada.