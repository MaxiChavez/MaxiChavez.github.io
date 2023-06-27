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

const crearSolucion = (vectorColores) => {
  let solucionJuego = [];
  let randomColor;
  for (let i = 0; i < 4; i++) {
    randomColor =
      vectorColores[Math.floor(vectorColores.length * Math.random())];
    solucionJuego.push(randomColor);
  }
  return solucionJuego;
};
console.log(crearSolucion(colores));

// 1. Seleccionar un color aleatorio del array de colores.
// 2. Introducir el color random seleccionado en un array de solucion.
// 3. Repetir los dos pasos anteriores 4 veces

//Generar codigo aleatorio segun la dificultad

// Cargar en el dom el containerBolas, cuando cargue
//la pantalla

// que con cada click valla alternando los colores en el pick
//para que el usuario elija el array con el que va a jugar.

const switchColor = (boton) => {
  if (boton.dataset.color === "default") {
    document.getElementById(boton.id).style.backgroundColor =
      colores[Number(boton.dataset.color) + 1];
    boton.dataset.color = boton.dataset.color + 1;
  }
  console.log(boton.dataset.color);
};

// function mandarId(id){
//   alert(id);
//  }
// <button id="boton" onclick="mandarId(this.id)">click aquí </button>

//cuando le da al boton ok, que pase al pick siguiente

// comrpobar ultimo pick chequea si co

//cuando completa el ultimo array que compruebe una vez si
// hay colores elegidos y por otro lado
// por otro lado que compruebe ubicacion
//que compruebe cantidadad de intentos y constate si el codigo
//elegido es elc correcto lanze un modal con felicitaciones
