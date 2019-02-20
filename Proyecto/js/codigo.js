//var db = window.openDatabase("Obligatorio", 1.0, "Obligatorio taller", 1024*1024*3);

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

function verificoNumerico(){ //Validacion de telefono
  var n = $("#telefono").val();
  var expresion1 = /^09[0-9]{7}$/;
  var expresion2 = /^[0-9]{8}$/;
  if (n == ''){
    ons.notification.alert("El campo es obligatorio.");
  }
  else if (!expresion1.test(n) && !expresion2.test(n)){ 
    ons.notification.alert("Numero de telefono incorrecto.");
    $("#telefono").val('');
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
        ons.notification.toast('Registro exitoso!', {
          timeout: 2000
        });
        $("#email").val();
		    $("#passR").val();
        $("#telefono").val();
        $("#passR2").val();
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
  setTimeout(function(){
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
        },
        error: function(err,cod,msg){
          console.log("err",err);
          $("#res").text(err.responseText);
          console.log("cod",cod);
          console.log("msg",msg);
          ons.notification.alert(err.responseJSON.descripcion);
        }
      });
  }, 3000);
  $("#btnLogin").html(`Ingresar`);
};

function errorGenerico()
{
  console.log("Error!");
}

function successGenerico()
{
  console.log("Success!");
}
