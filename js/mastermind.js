let datosJuego = JSON.parse(sessionStorage.sesion);

let dificultad = datosJuego.dificultad;
let colores = datosJuego.colores;
let nombreJugador = datosJuego.nombre;

//traigo datos del sesion storage/////

let cantidadIntentos;

switch (dificultad) {
  case "Dificil":
    cantidadIntentos = 6;

    break;

  case "Intermedio":
    cantidadIntentos = 8;
    break;

  default:
    cantidadIntentos = 10;
    break;
}
