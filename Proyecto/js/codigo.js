window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

function cerrarSesion(){
  user = ""; pass = "";
  $("#bienv").empty();
  $("#login").show();
  $("#contenido").hide();
  $(".contenidoUsu").hide();
};

function verificoNumerico(){ 
  var n = $("#telefono").val();
  if (n != 	/^09[0-9]{7}$/){
    alert("El teléfono debe ser numérico y de largo 9.")
    $("#telefono").val("");
  }else{
    alert("goot")
  }
}

function registrar(){
  if ($("#passR").val() != $("#passR2").val()) {
    alert("Las contraseñas no coinciden!");
  }else{
    //Asignar usuario.
  }
}

function login(){
  user = $("#user").val();
  pass = $("#pass").val();
  //Validar usuario.
  $("#btnLogin").html(`<ons-icon size="30px" spin icon="md-spinner"></ons-icon>`);
  setTimeout(() => {
    $("#bienv").html(
      '<div class="right"><p>Hola, ' + user + '</p></div>'
    );
    $("#login").hide();
    $("#contenido").show();
    $(".contenidoUsu").show();
    $("#btnLogin").html(`Ingresar`);
  }, 2000);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function delay() {
  console.log('Taking a break...');
  await sleep(3000);
  console.log('Two seconds later');
}
