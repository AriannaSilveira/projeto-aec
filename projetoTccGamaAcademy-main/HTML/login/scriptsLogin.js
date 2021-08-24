var endpointApi = 'https://localhost:5001';

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

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    $('#btnLogin').click(function () {
        var email = $('#email').val();
        var senha = $('#senha').val();
        var linkFinal = endpointApi + '/candidatos/' + email + '/' + senha;
        console.log(linkFinal);
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (candidato) {
                setCookie("id", candidato.id, 30);
                setCookie("nome", candidato.nome, 30);
                setCookie("email", candidato.email, 30);
                setCookie("idVaga", candidato.idVaga, 30);
                window.location.href = "../";
                //window.location.replace("../");
            },
            error: function (a, b, c)  {
                document.querySelector('#alertaSenhas').innerHTML = "Usuário ou senha incorretos.";
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
