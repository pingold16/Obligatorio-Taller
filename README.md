# Obl Taller 2doSemestr

APLICACIÓN MÓVIL MANTENIMIENTO DE VEHICULOS
Introducción
Se  desea  implementar  una  aplicación  para  registrar  los  mantenimientos  que  se  realizan  a  los vehículos del usuario de la APP.Requerimientos Funcionales 
●Registro de usuarios: 1) Se ingresa email, teléfono  y clave 2) Se debe validar que email y teléfono del usuario no existan previamente. 
●Login: 1) Validar que los datos de ingreso sean correctos (mail y  clave)
●Alta  de  vehículo  de  usuario:  1)  Se  registra  la  matrícula  del  vehículo  y    un  nombre descriptivo 2) Se deberá validar que no haya ya ingresado un vehículo con esa matrícula.
●Búsqueda  de  talleres  para  un  servicio  seleccionado:  
  1)  Se  elige  un  servicio  
  2)Se indicarán  en  un  mapa  los  talleres  que  brindan  el  servicio  seleccionado,  centrando  la vista del mapa en la ubicación actual del usuario 
  3) El usuario podrá seleccionar un taller de   los   que   figuran   en   el   mapa   y   visualizar   información   detallada,   registrarun mantenimiento  a  uno  de  sus  vehículos  o  recibir  indicaciones  de  cómo  llegar  desde  su ubicación actual hasta ese taller. 
  4) Además se puede marcar el taller como favorito (de forma local)
●Registro  de  mantenimiento  para  un  vehículo:    
  1)  Se  elige  el  vehículo  sobre  el  cual  se registra el mantenimiento. 
  2) Se selecciona un taller de la lista de favoritos si es que el taller  no  fue  seleccionado  previamente  desde  la  búsqueda
  3)  Se  selecciona  uno  de  los servicios  que  brinda  el  taller  
  4)  Se  registra  la  fecha,  descripción  del  mantenimiento,  el kilometraje  actual  del  vehículo  y  el  precio  que  se  pagó  por  ese  mantenimiento  (en dólares).
●Listado  de  mantenimientos  para  un  vehículo.  
  1)  Se  elige  un  vehículo  2)  Se  listan  todos los   mantenimientos   realizados   al   vehículo   ordenados   por   fecha.
  2)   Al   elegir   un mantenimiento,  se  despliega  fecha,  nombre  del  taller  donde  se  realizó,  el  servicio realizado,  su  descripción  y  precio.  Además  se  muestra  el  monto  total  gastado  hasta  el momento. 
  
Adicionalmente  se  deberá  implementar  un  requerimiento  adicional  que  utilice  una  capability adicional  del  celular  (distinta  a  la  geolocalización).  Este  requerimiento  será  acordado   en  clase con cada docente.
La  APP  móvil  a  desarrollar,  utilizará    una  API  REST  que  resuelve  a  nivel  del  servidor  las funcionalidades  solicitadas.      
La  API  será  proporcionada  por  el  equipo  docente  (no  se  debe implementar).   El   acceso   a   la   API   se   publicará   oportunamente   en   aulas   junto   con   la documentación correspondiente.

Requerimientos No Funcionales 
  1)   La   aplicación   deberáser   compilada   para   dispositivos   Android   (apk)   utilizando   Adobe PhoneGap Build. 
  2) Se utilizará para la implementación los frameworks de desarrollo jQuery y OnSenUI. 
  3) Se deberá considerar que solo usuarios autenticados (logeados en la APP) podrán invocar los serviciosREST incluidos en la API.EntregableEl ZIP/RAR de la entrega deberá contener:La aplicación instalable para Android .apk.Los códigos fuente de la aplicación
