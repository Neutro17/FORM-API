 var form = {};
form.fipe = document.getElementById("Nome");
form.marcas = document.getElementById("Sobrenome");
form.modelos = document.getElementById("Número");
form.anos = document.getElementById("E-mail");
form.fieldset = document.getElementById("Senha");

form.veiculo = {};
form.veiculo.valor = document.getElementById("veiculo_valor");
form.veiculo.marca = document.getElementById("veiculo_marca");
form.veiculo.modelo = document.getElementById("veiculo_modelo");
form.veiculo.anomodelo = document.getElementById("veiculo_anomodelo");
form.veiculo.combustivel = document.getElementById("veiculo_combustivel");
form.veiculo.codigofipe = document.getElementById("veiculo_codigofipe");
form.veiculo.mesreferencia = document.getElementById("veiculo_mesreferencia");
form.veiculo.tipoveiculo = document.getElementById("veiculo_tipoveiculo");
form.veiculo.siglacombustivel = document.getElementById("veiculo_siglacombustivel");

var getJSON = function (url, sucesso, erro) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.responseType = "json";
  httpRequest.addEventListener("readystatechange", function (event) {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status == 200) {
        if (sucesso) sucesso(httpRequest.response);
      } else {
        if (erro) erro(httpRequest.status, httpRequest.statusText);
      }
    }
  });

  httpRequest.send();
}

var getMarcas = function () {
  var url = 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/';
  getJSON('https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas', function (marcas) {

    form.marcas.innerHTML = "";
    form.marcas.disabled = null;

    var selectOption = document.createElement("option");
    selectOption.textContent = "Selecione...";
    selectOption.value = "";
    form.anos.appendChild(selectOption);

    marcas.forEach(function (marca, indce) {
      var optionMarca = document.createElement("option");
      optionMarca.textContent = marca.nome;
      optionMarca.value = marca.codigo;
      form.marcas.appendChild(optionMarca);
    });   

  }, function (errorCode, errorText) {

  });
}

var getModelos = function () {
  var url = 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/' + form.marcas.value + '/modelos';
  var selectOption = form.modelos.querySelector("option");
  selectOption.textContent = "Carregando Marcas";

  getJSON(url, function (modelos) {

    form.modelos.innerHTML = "";
    form.modelos.disabled = null;

    var optionModelo = document.createElement("option");
    optionModelo.textContent = "Selecione...";
    optionModelo.value = "";
    form.modelos.appendChild(optionModelo);

    var optionAno = document.createElement("option");
    optionAno.textContent = "Selecione um Modelo";
    optionAno.value = "";
    form.anos.appendChild(optionAno);

    modelos.modelos.forEach(function (modelo, indce) {
      var optionModelo = document.createElement("option");
      optionModelo.textContent = modelo.nome;
      optionModelo.value = modelo.codigo;
      form.modelos.appendChild(optionModelo);
    });   

  }, function (errorCode, errorText) {

  });
}

var getAnos = function () {
  var url = 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/' + form.marcas.value + '/modelos/' + form.modelos.value + '/anos';
  var selectOption = form.anos.querySelector("option");
  selectOption.textContent = "Carregando Anos";

  getJSON(url, function (anos) {

    form.anos.innerHTML = "";
    form.anos.disabled = null;

    var optionAno = document.createElement("option");
    optionAno.textContent = "Selecione...";
    optionAno.value = "";
    form.anos.appendChild(optionAno);

    anos.forEach(function (ano, indce) {
      var optionAno = document.createElement("option");
      optionAno.textContent = ano.nome;
      optionAno.value = ano.codigo;
      form.anos.appendChild(optionAno);
    });   

  }, function (errorCode, errorText) {

  });
}

var getVeiculo = function () {
  var url = 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/' + form.marcas.value + '/modelos/' + form.modelos.value + '/anos/' + form.anos.value;  

  getJSON(url, function (veiculo) {
    form.fieldset.disabled = "";
    form.veiculo.valor.value = veiculo.Valor;
    form.veiculo.marca.value = veiculo.Marca;
    form.veiculo.modelo.value = veiculo.Modelo;
    form.veiculo.anomodelo.value = veiculo.AnoModelo;
    form.veiculo.combustivel.value = veiculo.Combustivel;
    form.veiculo.codigofipe.value = veiculo.CodigoFipe;
    form.veiculo.mesreferencia.value = veiculo.MesReferencia;
    form.veiculo.tipoveiculo.value = veiculo.TipoVeiculo;
    form.veiculo.siglacombustivel.value = veiculo.SiglaCombustivel;
  }, function (errorCode, errorText) {

  });
}

form.marcas.addEventListener("change", function (event) {    
  form.modelos.disabled = "disabled";
  form.anos.disabled = "disabled";
  form.fieldset.disabled = "disabled";

  form.anos.innerHTML = "";
  var optionAno = document.createElement("option");
  optionAno.textContent = "Selecione um Modelo";
  optionAno.value = "";
  form.anos.appendChild(optionAno);

  if (form.marcas.value) {
    getModelos();
  } else {
    form.modelos.innerHTML = "";
    var selectOption = document.createElement("option");
    selectOption.textContent = "Selecione uma Marca";
    selectOption.value = "";
    form.modelos.appendChild(selectOption);
  }
});

form.modelos.addEventListener("change", function (event) {    
  form.anos.disabled = "disabled";
  form.fieldset.disabled = "disabled";

  if (form.modelos.value) {
    getAnos();
  } else {
    form.anos.innerHTML = "";
    var optionAno = document.createElement("option");
    optionAno.textContent = "Selecione um Modelo";
    optionAno.value = "";
    form.anos.appendChild(optionAno);
  }
});

form.anos.addEventListener("change", function (event) {
  form.fieldset.disabled = "disabled";

  if (form.anos.value) {
    form.fieldset.disabled = "disabled";

    getVeiculo();
  } else {

  }
});

getMarcas();
