var endpointApi = 'https://localhost:5001';

$(document).ready(function () {

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

    console.log("cookies: " + document.cookie);
    if (document.cookie.indexOf('nome=') > 0) {
        document.querySelector("#nomeLogin").innerHTML = '<a href="#" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">'+getCookie('nome')+'</span></a>';
    } else {
        document.querySelector("#nomeLogin").innerHTML = '<a href="../login/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">Login</span></a>';;
    }


    $.getJSON(endpointApi + "/vagas", function (vagas) {
        vagas.forEach(vaga => {
            var nomeEmpresa;
            $.getJSON(endpointApi + "/empresas/" + vaga.idEmpresa, function (empresa) {
                console.log(empresa.nome);
                nomeEmpresa = empresa.nome;
                var html = '<div class="news-link">' +
                    '<img class="poster" src="/img/post.png" />' +
                    '<h3 class="news-log">' + vaga.nome + '</h3>' +
                    '<p class="description">' +
                    vaga.descricao +
                    '</p><a href="#" class="btn-view"><span class="ic-sx24"></span>Inscreva-se</a>' +
                    '<span class="time-data">' + nomeEmpresa + '</span></div>';
                document.querySelector("#listVagas").innerHTML += html;
            });


        });
    });

    $.getJSON(endpointApi + "/empresas", function (empresas) {
        var contListEmpresas = 0;
        empresas.forEach(empresa => {
            console.log(empresa.nome);
            var html = '<div class="server online">' +
                '<img src="img/empresa.png" width="15%" />' +
                '<a href="#"> ' + empresa.nome + '</a>' +
                '</div>';
            document.querySelector("#listEmpresas").innerHTML += html;
        });
        document.querySelector("#contEmpresas").innerHTML = empresas.length;
    });

});