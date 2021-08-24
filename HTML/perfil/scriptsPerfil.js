$(document).ready(function () {


    // if ($('#select').val() == 'empresa') {
    //     $.ajax({
    //         url: endpointApi + '/empresa',
    //         type: 'POST',
    //         data: $('form').serialize(),
    //         success: function (result) {
    //             console.log(result);
    //         },
    //         error: function (request, status, error) {
    //             alert(request.responseText);
    //         }
    //     });
    // }

    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    var tipo = url.searchParams.get("t");
    console.log(getCookie("id"))

    // <span style="font-weight: bold; font-size: 22px;" id="userNome">Lavyk Soares</span><br />
    // <span style="" id="userEmail">lavyk_@hotmail.com</span><br />
    // <span style="" id="userTipo">Candidato</span><br /><br />
    // <span style="" id="userEndereco">Rua João Alves Diniz, 40, Campina Grande - PB</span><br />

    if (tipo == "0" && id != null) {

        var linkFinal = endpointApi + '/candidatos/' + id;
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (candidato) {
                // Se retornar sucesso lista os dados do candidato
                document.querySelector("#userNome").innerHTML = candidato.nome;
                document.querySelector("#userEmail").innerHTML = candidato.email;
                document.querySelector("#userTipo").innerHTML = "Candidato";
                var endereco = candidato.bairro + ", " + candidato.cidade + " - " + candidato.estado;
                document.querySelector("#userEndereco").innerHTML = endereco;
            },
            error: function (a, b, c) {
                document.querySelector("#userNome").innerHTML = "Não encontrado";
                document.querySelector("#userEmail").innerHTML = "";
                document.querySelector("#userTipo").innerHTML = "";
                document.querySelector("#userEndereco").innerHTML = "";
                // Se retornar erro ele volta para a pagina anterior
                //window.history.back();
            }
        });
    } else if (tipo == "1" && id != null) {
        var linkFinal = endpointApi + '/empresas/' + id;
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (empresa) {
                // Se retornar sucesso lista os dados da empresa
                document.querySelector("#userNome").innerHTML = empresa.nome;
                document.querySelector("#userEmail").innerHTML = empresa.email;
                document.querySelector("#userTipo").innerHTML = "Empresa";
                var endereco = empresa.bairro + ", " + empresa.cidade + " - " + empresa.estado;
                document.querySelector("#userEndereco").innerHTML = endereco;
            },
            error: function (a, b, c) {
                document.querySelector("#userNome").innerHTML = "Não encontrado";
                document.querySelector("#userEmail").innerHTML = "";
                document.querySelector("#userTipo").innerHTML = "";
                document.querySelector("#userEndereco").innerHTML = "";
                // Se retornar erro ele volta para a pagina anterior
                //window.history.back();
            }
        });
    } else {
        if (estaLogado()) {
            document.querySelector("#userNome").innerHTML = getCookie("nome");
            document.querySelector("#user;  Email").innerHTML = getCookie("email");
            document.querySelector("#userTipo").innerHTML = getCookie("tipo");
            var endereco = getCookie("bairro") + ", " + getCookie("cidade") + " - " + getCookie("estado");
            document.querySelector("#userEndereco").innerHTML = endereco;

            if (getCookie("tipo") == "empresa") {
                // Ajax GET Vagas pelo idEmpresa
                document.querySelector("#listVagas") = "asdad";

            } else if (getCookie("tipo") == "candidato") {
                // Ajax GET Vagas pelo idVaga
                document.querySelector("#listVagas") = "asdad";
            }


        } else {
            document.querySelector("#userNome").innerHTML = "Não encontrado";
            document.querySelector("#userEmail").innerHTML = "";
            document.querySelector("#userTipo").innerHTML = "";
            document.querySelector("#userEndereco").innerHTML = "";
        }
    }
});




                // //Consulta o webservice viacep.com.br/
                // $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                //     if (!("erro" in dados)) {
                //         //Atualiza os campos com os valores da consulta.
                //         $("#rua" + id).val(dados.logradouro);
                //         $("#bairro" + id).val(dados.bairro);
                //         $("#cidade" + id).val(dados.localidade);
                //         $("#uf" + id).val(dados.uf);
                //         $("#ibge" + id).val(dados.ibge);
                //     } //end if.
                //     else {
                //         //CEP pesquisado não foi encontrado.
                //         limpa_formulário_cep();
                //         alert("CEP não encontrado.");
                //     }
                // });
