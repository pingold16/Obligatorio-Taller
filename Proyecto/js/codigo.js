var db = window.openDatabase("Obligatorio", 1.0, "Obligatorio taller", 1024*1024*3);

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
  fn.load('home.html');
};

function verificoNumerico(){ 
  var n = $("#telefono").val();
  if (n != /^09[0-9]{7}$/){ //Esto anda mal!
    ons.notification.alert("El teléfono debe ser numérico y de largo 9.")
    $("#telefono").val("");
  }else{
    ons.notification.alert("goot")
  }
}

function registrar(){
  if ($("#passR").val() != $("#passR2").val()) { //Verifica que los dos pass sean iguales
    ons.notification.alert("Las contraseñas no coinciden!");
  }else{
    var usu = $("#email").val();
		var pass = $("#passR").val();
		var tel = $("#telefono").val();
		$.ajax({
		  url: "http://api.marcelocaiafa.com/usuario",
			type: "POST",
			dataType: "JSON",
			data: JSON.stringify({
			  email: usu,
				password: pass,
				telefono: tel
			}),
			success: function(response){
        console.log("success",response);
        idUsu = response.description.usuario.id;
        token = response.description.token;
        $("#res").text("Exito! -> " + JSON.stringify(response));
        respuesta = response;
      },
      error: function(err,cod,msg){
        console.log("err",err);
        ons.notification.alert(err.responseJSON.descripcion);
        console.log("cod",cod);
        console.log("msg",msg);
      }
		});
  }
}

function login(){
  var user = $("#user").val();
  var pass = $("#pass").val();
  
  $("#btnLogin").html(`<ons-icon size="30px" spin icon="md-spinner"></ons-icon>`);
  setTimeout(() => {
      $.ajax({
        url: "http://api.marcelocaiafa.com/login",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify({
          email: user,
          password: pass
        }),
        success: function(response){
            console.log("success",response);
            $("#res").text("Exito! -> " + JSON.stringify(response));
            respuesta = response;
            ons.notification.toast('Bienvenido ' + user, {
              timeout: 2000
            });
            $("#login").hide();
            $("#contenido").show();
            $(".contenidoUsu").show();
            $("#btnLogin").html(`Ingresar`);
          },
          error: function(err,cod,msg){
            console.log("err",err);
            $("#res").text(err.responseText);
            console.log("cod",cod);
            console.log("msg",msg);
            ons.notification.alert(err.responseJSON.descripcion);
            $("#btnLogin").html(`Ingresar`);
          }
      });
  }, 1000);
};

function errorGenerico()
{
  console.log("Error!");
}

function successGenerico()
{
  console.log("Success!");
}
