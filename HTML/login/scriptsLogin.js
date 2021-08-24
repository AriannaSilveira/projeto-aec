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

    if(estaLogado()) {
        window.location.href = "../";
    }

    $('#btnLogin').click(function () {
        var email = $('#email').val();
        var senha = $('#senha').val();
        var linkFinal = endpointApi + '/candidatos/' + email + '/' + senha;
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (candidato) {
                // Se retornar sucesso é pq é Candidato
                setCookie("tipo", "candidato", 30);
                setCookie("id", candidato.id, 30);
                setCookie("nome", candidato.nome, 30);
                setCookie("email", candidato.email, 30);
                setCookie("idVaga", candidato.idVaga, 30);
                window.location.href = "../";
            },
            error: function (a, b, c) {
                // Se retornar erro é pq não é Candidato
                // Vamos testar se é Empresa
                var linkFinal = endpointApi + '/empresas/' + email + '/' + senha;
                $.ajax({
                    url: linkFinal,
                    type: 'GET',
                    success: function (empresa) {
                        // Se retornar sucesso é pq é Empresa
                        setCookie("tipo", "empresa", 30);
                        setCookie("id", empresa.id, 30);
                        setCookie("nome", empresa.nome, 30);
                        setCookie("email", empresa.email, 30);
                        window.location.href = "../";
                        //window.location.replace("../");
                    },
                    error: function (a, b, c) {
                        // Se retornar erro é pq não é Candidato nem Empresa.
                        document.querySelector('#alertaSenhas').innerHTML = "Usuário ou senha incorretos.";
                    }
                });
            }
        });
    });
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
