$(function(){
        var operacao = "A"; //"A"=Adição; "E"=Edição
        var indice_selecionado = -1; //Índice do item selecionado na lista
        var tbVagas = localStorage.getItem("tbVagas");// Recupera os dados armazenados
        tbVagas = JSON.parse(tbVagas); // Converte string para objeto
        if(tbVagas == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbVagas = [];
    });
    
    function Adicionar(){
        var vagas = JSON.stringify({
            Numero   : $("#numero").val(),
            Tipo     : $("#tipo").val(),
            Descrição : $("#descricao").val()
        });
        tbVagas.push(vagas);
        localStorage.setItem("tbVagas", JSON.stringify(tbVagas));
        alert("Registro adicionado.");
        return true;
    }
    
    function Editar(){
        tbVagas[indice_selecionado] = JSON.stringify({
                Numero   : $("#numero").val(),
                Tipo     : $("#tipo").val(),
                Descrição : $("#descricao").val()
            });//Altera o item selecionado na tabela
        localStorage.setItem("tbVagas", JSON.stringify(tbVagas));
        alert("Informações editadas.")
        operacao = "A"; //Volta ao padrão
        return true;
    }
    
    function Excluir(){
        tbVagas.splice(indice_selecionado, 1);
        localStorage.setItem("tbVagas", JSON.stringify(tbVagas));
        alert("Registro excluído.");
    }
    
    function Listar(){
        $("#tbodyVagas").html("");
        $("#tbodyVagas").html(
            "<thead>"+
            "   <tr>"+
            "   <th></th>"+
            "   <th>Número</th>"+
            "   <th>Tipo</th>"+
            "   <th>descrição</th>"+
            "   </tr>"+
            "</thead>"+
            "<tbody>"+
            "</tbody>"
            );
        for(var i in tbVagas){
            var vaga = JSON.parse(tbVagas[i]);
            $("#tbodyVagas tbody").append("<tr>");        
            $("#tbodyVagas tbody").append("<td>"+vagas.Numero+"</td>");
            $("#tbodyVagas tbody").append("<td>"+vagas.Tipo+"</td>");
            $("#tbodyVagas tbody").append("<td>"+vagas.Descrição+"</td>");
            $("#tbodyVagas tbody").append("</tr>");
        }
    }
    
    $("#formVaga").on("submit",function(){
        if(operacao == "A")
            return Adicionar();
        else
            return Editar();
    });
    
    
    $("#tbodyVagas").on("click", ".btnEditar", function(){
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var vagas = JSON.parse(tbVagas[indice_selecionado]);
        $("#numero").val(vagas.Numero);
        $("#tipo").val(vagas.Tipo);
        $("#descicao").val(vagas.Descrição);
        $("#numero").attr("readonly","readonly");
        $("#numero").focus();
    });
    
    $("#tbodyVagas").on("click", ".btnExcluir",function(){
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });
    
  