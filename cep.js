jQuery(function(){
    var onlyNumbers = function(e){
        this.value = this.value.replace(/\D/g, "");
    }
    
    var validateEntry = function(){
        var cep = this.value;
        console.log(cep);

        if(cep.length === 8){
            $(this).removeClass("error");
            getAddress(cep);
        } else {
            $(this).addClass("error");
        }
    }

    var getAddress = function(cep){
        $.ajax({
            url:"https://viacep.com.br/ws/"+cep+"/json/",
            dataType:"json",
            error:getAddressError,
            success:getAddressSuccess
        });
    }

    var getAddressError = function(){
        console.error("Falhou!");
        alert("Não foi possível encontrar o CEP indicado! Por favor, digite outro!");
    }

    var getAddressSuccess = function(data){
        $("#logradouro").val(data.logradouro);
        $("#bairro").val(data.bairro);
        $("#cidade").val(data.localidade);
        $("#estado").val(data.uf);
    }

    $("#cep")
    .on("input", onlyNumbers) 
    .on("focusout", validateEntry);



});