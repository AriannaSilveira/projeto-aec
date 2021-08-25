$(document).ready(function () {


    if (estaLogado()) {
        window.location.href = "../";
    }

    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    $('#btnRegister').click(function () {
        //console.log($('form').serialize());
        var $form = $("form");
        var dataJson = getFormData($form);
        if ($('#select').val() == 'empresa') {
            $.ajax({
                url: endpointApi + '/empresas/',
                type: 'PUT',
                data: JSON.stringify(dataJson),
                success: function (result) {
                    console.log("Cadastrado com sucesso.");
                    window.location.href = "../";
                },
                error: function (request, status, error) {
                    console.log(request.responseText);
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }

        if ($('#select').val() == 'profissional') {
            $.ajax({
                url: endpointApi + '/candidatos/',
                type: 'PUT',
                data: JSON.stringify(dataJson),
                success: function (result) {
                    console.log("Cadastrado com sucesso.");
                    window.location.href = "../";
                },
                error: function (request, status, error) {
                    console.log(request.responseText);
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
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

            html = '<div id="formEmpresa"> <div><input id="nome" name="nome" placeholder="Nome da empresa" type="text" required="required"></div> <div><input id="cpnj" name="cpnj" placeholder="CNPJ" type="text"></div> <div><input id="cep" name="cep" placeholder="CEP" type="text" value="" size="10" maxlength="9" required="required" onkeydown="javascript: fMasc( this, mCEP );" maxlength="9"> </div> <div><input id="rua" name="rua" placeholder="Rua" type="text" size="60" required="required"></div> <div><input id="numero" name="numero" placeholder="Número" type="text" required="required"></div> <div><input id="bairro" name="bairro" placeholder="Bairro" type="text" size="40" required="required"> </div> <div><input id="cidade" name="cidade" placeholder="Cidade" type="text" size="40" required="required"> </div> <div><input id="estado" name="estado" placeholder="Estado" type="text" size="2" required="required"></div></div>';

        } else if ($(this).val() == "profissional") {

            $('#formProfissional').show(100);
            $('#formEmpresa').hide(100);
            tipoSelecionado = "Profissional";

            //$('*[id*=Empresa]').prop("required", false);
            //$('*[id*=Profissional]').prop("required", true);

            html = '<div id="formProfissional"> <div><input id="nome" name="nome" placeholder="Nome" type="text" required="required"></div> <div><input id="cpf" name="cpf" placeholder="CPF" type="text" required="required" onkeydown="javascript: fMasc( this, mCPF );" maxlength="14"></div> <div><input id="cep" name="cep" placeholder="CEP" type="text" value="" size="10" maxlength="9" required="required" onkeydown="javascript: fMasc( this, mCEP );" maxlength="9"></div> <div><input id="rua" name="rua" placeholder="Rua" type="text" size="60" required="required"></div> <div><input id="numero" name="numero" placeholder="Número" type="text" required="required"></div> <div><input id="bairro" name="bairro" placeholder="Bairro" type="text" size="40" required="required"> </div> <div><input id="cidade" name="cidade" placeholder="Cidade" type="text" size="40" required="required"> </div> <div><input id="estado" name="estado" placeholder="Estado" type="text" size="2" required="required"></div> <div><input id="telefone" name="telefone" placeholder="Telefone: (DDD) + Número" type="text" required="required" onkeydown="javascript: fMasc( this, mTelefone );" maxlength="17"> </div> <div> <select id="formacao" name="formacao" required="required"> <option value="null">Selecione sua profissão</option> <option value="estudante">Estudante</option> <option value="programador">Programador</option> <option value="atendente">Atendente</option> <option value="outro">Outro</option> </select> </div></div>';
        } else {
            $('#formProfissional').hide(100);
            $('#formEmpresa').hide(100);
            html = '';
        }

        document.querySelector("#form").innerHTML = html;
        $('#cep').on('keyup', function () {
            if (this.value.length == 9) {
                carregarEndereco();
            }
        });
        //$('[id*="_' + tipoSelecionado + '_"]').removeAttr('required');
    });

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#estado").val("");
    }

    function carregarEndereco() {
        var cep = $("#cep").val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#estado").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        //alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                //alert("Formato de CEP inválido.");
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

    $('#cep').on('keyup', function () {
        if (this.value.length == 9) {
            carregarEndereco();
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