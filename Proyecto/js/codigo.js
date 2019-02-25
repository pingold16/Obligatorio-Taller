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

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'servicio') {
    cargarListaServicio();
  }else if (page.id === 'mapa') {
    mostrarMapa();
  }
});

function cerrarSesion(){
  user = ""; pass = "";
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/logout",
    type: "POST",
    dataType: "JSON",
    success: function(response){
      console.log("success",response);
      ons.notification.toast(response.description, {
        timeout: 2000
      });
      sessionStorage.setItem('token', 0);
      $("#bienv").empty();
      $("#login").show();
      $("#contenido").hide();
      $(".contenidoUsu").hide();
      fn.load('home.html');
    },
    error: function(err,cod,msg){
      console.log("err",err);
      console.log("cod",cod);
      console.log("msg",msg);
    }
  });
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
        respuesta = response;
        ons.notification.toast('Registro exitoso!', {
          timeout: 2000
        });
        $("#email").val('');
		    $("#passR").val('');
        $("#telefono").val('');
        $("#passR2").val('');
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
          respuesta = response;
          idUsu = response.description.usuario.id;
          token = response.description.token;
          sessionStorage.setItem('idUsu', idUsu)
          sessionStorage.setItem('token', token)
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
          console.log("cod",cod);
          console.log("msg",msg);
          ons.notification.alert(err.responseJSON.descripcion);
        }
      });
  }, 1000);
}

//Mi vehiculo
function despliegaReg(){
  $("#regVehiculo").toggle();
  //$("#btnMostrar").html('Ocultar');
}

function registrarVehiculo(){
  var mat = $("#Matricula").val();
  var marca = $("#Marca").val();
  var modelo = $("#Modelo").val();
  var descVehiculo = marca + " " + modelo;
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/vehiculo",
    type: "POST",
    dataType: "JSON",
    data: JSON.stringify({
      matricula: mat,
      descripcion: descVehiculo,
      usuario: sessionStorage.getItem('idUsu')
    }),
    success: function(response){
      console.log("success",response);
      respuesta = response;
      ons.notification.toast('Registro exitoso!', {
        timeout: 2000
      });
      $("#Matricula").val('');
      $("#Marca").val('');
      $("#Modelo").val('');
    },
    error: function(err,cod,msg){
      console.log("err",err);
      ons.notification.alert(err.responseJSON.descripcion);
      console.log("cod",cod);
      console.log("msg",msg);
    }
  });
}

function mostrarListaVehiculo(){
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/vehiculo/?usuario=" + sessionStorage.getItem('idUsu'),
    type: "GET",
    dataType: "JSON",
    success: function(response){
      $("#resultado").empty();
      console.log("success",response);
      response.description.forEach(function(e,i){
        $("#resultado").append('<ons-list-item class="table" tappable onclick=mostrarDescripcion("'+ e.id +'")>'+
            '</div><span class="list-item__title">' + e.matricula +
            '</span><span class="list-item__subtitle">' + e.descripcion + 
            '</span></div></ons-list-item>'
        );
      });
    },
    error: function(err,cod,msg){
      console.log("err",err);
      console.log("cod",cod);
      console.log("msg",msg);
      ons.notification.alert(err.responseJSON.descripcion);
    }
  });
}

function mostrarDescripcion(id){
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/mantenimiento/",
    type: "GET",
    dataType: "JSON",
    data:{
      vehiculo: id
    },
    success: function(response){
      console.log("success",response);
      ons.openActionSheet({
        title: 'Mantenimiento',
        cancelable: true,
        buttons: [
          response.description.forEach(i => { //No se porque no andaaaaaa
            i.descripcion;
          }),
        {
          label: 'Cancel',
          icon: 'md-close'
        } 
        ]
      })
    },
    error: function(err,cod,msg){
      console.log("err",err);
      console.log("cod",cod);
      console.log("msg",msg);
      ons.notification.alert(err.responseJSON.descripcion);
    }
  });
}

function showActionSheet(){
  
}

//Mantenimiento
function cargarListaServicio(){
  cargarVehiculos();
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/servicio",
    type: "GET",
    dataType: "JSON",
    success: function(response){
      console.log("success",response);
      var res = '<ons-select id="selServicio" onchange="cargarTaller()"><option value="0">Seleccione un servicio</option>';
      response.description.forEach(function(e,i){
        res +='<option value="'+ e.id +'">'+ e.nombre +'</option>';
      });
      res += '</ons-select>';
      $("#choose-sel").html(res);
    },
    error: function(err,cod,msg){
      console.log("err",err);
      ons.notification.alert(err.responseJSON.descripcion);
      console.log("cod",cod);
      console.log("msg",msg);
    }
  });
}

function cargarVehiculos(){
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/vehiculo/?usuario=" + sessionStorage.getItem('idUsu'),
    type: "GET",
    dataType: "JSON",
    success: function(response){
      $("#resultado").empty();
      console.log("success",response);
      var res = '<ons-select id="selVehiculo"><option value="0">Seleccione su vehiculo</option>';
      response.description.forEach(function(e,i){
        res +='<option value="'+ e.id +'">'+ e.descripcion + ' ' + e.matricula +'</option>';
      });
      res += '</ons-select>';
      $("#choose-selV").html(res);
    },
    error: function(err,cod,msg){
      console.log("err",err);
      ons.notification.alert(err.responseJSON.descripcion);
      console.log("cod",cod);
      console.log("msg",msg);
    }
  });
}

function cargarTaller(){
  $.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
    url: "http://api.marcelocaiafa.com/taller",
    type: "GET",
    dataType: "JSON",
    data:{
      servicio: $("#selServicio").val()
    },
    success: function(response){
      console.log("success",response);
      var res = '<ons-select id="selTaller"><option value="0">Seleccione un taller</option>';
      response.description.forEach(function(e,i){
        res +='<option value="'+ e.id +
        'onclick="function(){ $("#form").show(); }"'+
        '">'+ e.descripcion +'</option>';
      });
      res += '</ons-select><br/>';
      $("#choose-selT").html(res);
    },
    error: function(err,cod,msg){
      console.log("err",err);
      ons.notification.alert(err.responseJSON.descripcion);
      console.log("cod",cod);
      console.log("msg",msg);
    }
  });
}

function registroMantenimiento(){
  var servicio = $("#selServicio").val();
	var vehiculo = $("#selVehiculo").val();
  var taller = $("#selTaller").val();
  var km = $("#kilometraje").val();
  var costo = $("#costo").val();
  var fecha = $("#date").val();
  fecha = convertirFecha(fecha);
  //fecha = moment(fecha).format('DD/MM/YYYY'); 
  var desc = $("#descripcion").val();
	$.ajax({
    headers:{
      Authorization: sessionStorage.getItem('token')
    },
		url: "http://api.marcelocaiafa.com/mantenimiento",
		type: "POST",
		dataType: "JSON",
		data: JSON.stringify({
      vehiculo: vehiculo,  
      descripcion: desc,  
      fecha: fecha,  
      servicio: servicio,  
      kilometraje: km,  
      costo: costo,  
      taller: taller
		}),
		success: function(response){
      console.log("success",response);
      respuesta = response;
      ons.notification.toast('Registro exitoso!', {
        timeout: 2000
      });
     
       $("#selServicio").val('');
       $("#selVehiculo").val('');
       $("#selTaller").val('');
       $("#kilometraje").val('');
       $("#costo").val('');
       $("#date").val('');
       $("#descripcion").val('');
    },
    error: function(err,cod,msg){
      console.log(fecha);
      console.log($("#date").val());
      console.log("err",err);
      console.log("cod",cod);
      console.log("msg",msg);
      ons.notification.alert(err.responseJSON.descripcion);
    }
	});
}

function convertirFecha(f){
  var r = f[8] + f[9] + '/' + f[5] + f[6] + '/' + f[0] + f[1] + f[2] + f[3] + ' 00:00';
  return r;
}

//Mapa

var db = window.openDatabase('bdPrueba','1.0','Base de Datos de Prueba',1024*1024*5);

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

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'mapaInsta') {
    idMapa = 'mapInsta';
    mostrarMapa();
  } else if (page.id === 'mapaClick') {
    idMapa = 'mapClick';
  }
});

var map;
var idMapa;
var miLat;
var miLng;
var posCDS = {lat: -34.7970, lng: -56.0671};
var freno = {lat: -34.8812295, lng: -56.1815571};

function mostrarMapa(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
}

var onSuccess = function(position) {

  miLat = position.coords.latitude;
  miLng = position.coords.longitude;

  setTimeout(initMap,0);

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById(idMapa), {
    center: {lat: miLat, lng: miLng},
    zoom: 13
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: {lat: miLat, lng: miLng},
    destination: freno,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}