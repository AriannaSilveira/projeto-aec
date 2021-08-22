$(document).ready(function() {
    $('#formEmpresa').hide();
    $('#formProfissional').hide();

    $('#select').change(function() {
        if($(this).val() == "empresa") {

            $('#formEmpresa').show(1000);
            $('#formProfissional').hide(1000);

        } else if($(this).val() == "profissional") {

            $('#formProfissional').show(1000);
            $('#formEmpresa').hide(1000)

        } else {
            $('#formProfissional').hide(1000);
            $('#formEmpresa').hide(1000)
        }
      });
  }); 