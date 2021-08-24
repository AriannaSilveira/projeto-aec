var endpointApi = 'https://localhost:5001';

$(document).ready(function () {

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
        $.ajax({
            url: endpointApi + '/vagas/',
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

    })
});
