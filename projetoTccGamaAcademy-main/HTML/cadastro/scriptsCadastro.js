var endpointApi = 'https://localhost:5501';

$(document).ready(function () {

    $('#btnRegister').click(function () {
        console.log($('#select').val());

        if ($('#select').val() == 'empresa') {
            $.ajax({
                url: endpointApi + '/empresa',
                type: 'PUT',
                data: $('form').serialize(),
                success: function (result) {
                    console.log(result);
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }

        if ($('#select').val() == 'profissional') {
            $.ajax({
                url: endpointApi + '/profissional',
                type: 'PUT',
                data: $('form').serialize(),
                success: function (result) {
                    console.log(result);
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }

        return false;
    });


    var tipoSelecionado;

    $('#formEmpresa').hide();
    $('#formProfissional').hide();

    $('#select').change(function () {
        var html;
        if ($(this).val() == "empresa") {

            $('#formEmpresa').show(100);
            $('#formProfissional').hide(100);
            tipoSelecionado = "Empresa";

            //$('*[id*=Empresa]').prop("required", true);
            //$('*[id*=Profissional]').prop("required", false);

            html = '               <div id="formEmpresa">                  <div><input id="nomeEmpresa" name="nomeEmpresa" placeholder="Nome da empresa" type="text"                        required="required"></div>                  <div><input id="cnpjEmpresa" name="cnpjEmpresa" placeholder="CNPJ" type="text"></div>                  <div><input id="cepEmpresa" name="cepEmpresa" placeholder="CEP" type="text" value="" size="10"                        maxlength="9" required="required" onkeydown="javascript: fMasc( this, mCEP );" maxlength="9">                  </div>                  <div><input id="ruaEmpresa" name="ruaEmpresa" placeholder="Rua" type="text" size="60"                        required="required"></div>                  <div><input id="numeroEmpresa" name="numeroEmpresa" placeholder="Número" type="text"                        required="required"></div>                  <div><input id="bairroEmpresa" name="bairroEmpresa" placeholder="Bairro" type="text" size="40"                        required="required">                  </div>                  <div><input id="cidadeEmpresa" name="cidadeEmpresa" placeholder="Cidade" type="text" size="40"                        required="required">                  </div>                  <div><input id="ufEmpresa" name="ufEmpresa" placeholder="Estado" type="text" size="2"                        required="required"></div>               </div>';

        } else if ($(this).val() == "profissional") {

            $('#formProfissional').show(100);
            $('#formEmpresa').hide(100);
            tipoSelecionado = "Profissional";

            //$('*[id*=Empresa]').prop("required", false);
            //$('*[id*=Profissional]').prop("required", true);

            html = '<div id="formProfissional">                  <div><input id="nomeProfissional" name="nomeProfissional" placeholder="Nome" type="text"                        required="required"></div>                  <div><input id="cpfProfissional" name="cpfProfissional" placeholder="CPF" type="text"                        required="required" onkeydown="javascript: fMasc( this, mCPF );" maxlength="14"></div>                  <div><input id="cepProfissional" name="cepProfissional" placeholder="CEP" type="text" value=""                        size="10" maxlength="9" required="required" onkeydown="javascript: fMasc( this, mCEP );"                        maxlength="9"></div>                  <div><input id="ruaProfissional" name="ruaProfissional" placeholder="Rua" type="text" size="60"                        required="required"></div>                  <div><input id="numeroProfissional" name="numeroProfissional" placeholder="Número" type="text"                        required="required"></div>                  <div><input id="bairroProfissional" name="bairroProfissional" placeholder="Bairro" type="text"                        size="40" required="required">                  </div>                  <div><input id="cidadeProfissional" name="cidadeProfissional" placeholder="Cidade" type="text"                        size="40" required="required">                  </div>                  <div><input id="ufProfissional" name="ufProfissional" placeholder="Estado" type="text" size="2"                        required="required"></div>                  <div><input id="telefoneProfissional" name="telefoneProfissional"                        placeholder="Telefone: (DDD) + Número" type="text" required="required"                        onkeydown="javascript: fMasc( this, mTelefone );" maxlength="17">                  </div>                  <div><select id="profissaoProfissional" name="profissaoProfissional" required="required">                        <option value="null">Selecione sua profissão</option>                        <option value="estudante">Estudante</option>                        <option value="programador">Programador</option>                        <option value="atendente">Atendente</option>                        <option value="outro">Outro</option>                     </select></div>               </div>';

        } else {
            $('#formProfissional').hide(100);
            $('#formEmpresa').hide(100);
            html = '';
        }

        document.querySelector("#form").innerHTML = html;
        $('[id*="_' + tipoSelecionado + '_"]').removeAttr('required');
    });

    function limpa_formulário_cep(id) {
        // Limpa valores do formulário de cep.
        $("#rua" + id).val("");
        $("#bairro" + id).val("");
        $("#cidade" + id).val("");
        $("#uf" + id).val("");
        $("#ibge" + id).val("");
    }

    function carregarEndereco(id) {
        var cep = $("#cep" + id).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua" + id).val("...");
                $("#bairro" + id).val("...");
                $("#cidade" + id).val("...");
                $("#uf" + id).val("...");
                $("#ibge" + id).val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua" + id).val(dados.logradouro);
                        $("#bairro" + id).val(dados.bairro);
                        $("#cidade" + id).val(dados.localidade);
                        $("#uf" + id).val(dados.uf);
                        $("#ibge" + id).val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(carregarEndereco);

    // $(this).on('keyup', function() {
    //     console.log(this.prop('id'));
    //     tipoSelecionado.on('keyup', function() {
    //         console.log(this.value.length);
    //         if(this.value.length == 9) {
    //             carregarEndereco();
    //         }
    //     });
    // });

    $('#cepEmpresa').on('keyup', function () {
        if (this.value.length == 9) {
            carregarEndereco('Empresa');
        }
    });

    $('#cepProfissional').on('keyup', function () {
        if (this.value.length == 9) {
            carregarEndereco('Profissional');
        }
    });

    // tipoSelecionado.on('keyup', function() {
    //     console.log(this);
    //     console.log(this.value.length);
    //     if(this.value.length == 9) {
    //         carregarEndereco();
    //     }
    // });

    // $("#cep" + tipoSelecionado).on('keyup', function() {
    //     console.log(this);
    //     console.log(this.value.length);
    //     if(this.value.length == 9) {
    //         carregarEndereco();
    //     }
    // });

});


function ValidaCPF() {
    var RegraValida = document.getElementById("RegraValida").value;
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    if (cpfValido.test(RegraValida) == true) {
        console.log("CPF Válido");
    } else {
        console.log("CPF Inválido");
    }
}
function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

function mCEP(cep) {
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
    return cep
}

function mTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "")
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2")
    telefone = telefone.replace(/(\d{5})(\d)/, "$1 $2")

    return telefone
}

function checkSenhas() {
    var senha = document.querySelector('#senha').value;
    var senhaRepetida = document.querySelector('#senhaRepetida').value;

    var texto;
    var cor;
    if (senha == senhaRepetida) {
        texto = "✓ As senhas coincidem.";
        cor = '#177500';
    } else if (senhaRepetida == "") {
        texto = ""
    } else {
        texto = "✘ As senhas não coincidem."
        cor = '#860000';
    }

    document.querySelector("#alertaSenhas").innerHTML = texto;
    document.querySelector("#alertaSenhas").style.color = cor;
}