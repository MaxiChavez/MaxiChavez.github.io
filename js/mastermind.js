//traigo y declaro las variables

let datosJuego = JSON.parse(sessionStorage.sesion);

let dificultad = datosJuego.dificultad;
//colores son los colores seleccionas por usuario
let colores = datosJuego.colores;
let nombreJugador = datosJuego.nombre;
//codigo colores ganador
let coloresSolucion = [];

let numeroBoton = 0;
let cantidadIntentos;
let intentosRealizados = 0;
let rootSection = document.getElementById("section-bolas");

// El articulo con los bolas lo meto dentro de la funcion
const crearArticuloBoton = (id) => {
  return `<article class= "carta">
  <div id="container" class="container">
    <div id="containerBolas" class="containerBolas">
      <div id = "ball${id}" data-color="-1" data-identificador = "${id}" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${id + 1}" data-color="-1" data-identificador = "${
    id + 1
  }" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${id + 2}" data-color="-1" data-identificador = "${
    id + 2
  }" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${id + 3}" data-color="-1" data-identificador = "${
    id + 3
  }" onclick="switchColor(this)" class="ball"></div>
    </div>
    <div id="containerComprobador" class="containerComprobador">
      <div class="row">
        <div id = "comprobador${id}" class="comprobador"></div>
        <div id = "comprobador${id + 1}" class="comprobador"></div>
      </div>
      <div class="row">
        <div id = "comprobador${id + 2}" class="comprobador"></div>
        <div id = "comprobador${id + 3}" class="comprobador"></div>
      </div>
    </div>
    <div class="col-auto">
      <button id="btn" type="submit" class="botonCheckIntento btn btn-primary" onclick="checkIntento()">✓</button>
    </div>
    <!-- <button class="btn">✓</button> -->
  </div>
  </article>`;
};
const colorRender = (color) => {
  return `<div data-color="-1" class="ball" style="background-color:${color};"></div>`;
};

//funcion  donde se declara el codigo random
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

//traigo datos del sesion storage/////
const InicioPagina = () => {
  rootSection.innerHTML += crearArticuloBoton(numeroBoton);
  numeroBoton += 4;
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

  coloresSolucion = crearSolucion(colores);
  console.log("Código ganador:", coloresSolucion);
  let coloresASeleccionar = document.getElementById("div-containerBolas");
  for (let i = 0; i < colores.length; i++) {
    coloresASeleccionar.innerHTML += colorRender(colores[i]);
  }
  document.getElementById("div-selector-colores").innerHTML +=
    crearArticuloSelectorColores(
      coloresSolucion[0],
      coloresSolucion[1],
      coloresSolucion[2],
      coloresSolucion[3]
    );
};
// igualo el array vacio coloresSolucion a la funcion, para que sea Random
// cuando cargue la pagina

const switchColor = (boton) => {
  if (boton.dataset.color == -1) {
    //Primera vez que le hago click al ball
    document.getElementById(boton.id).style.backgroundColor = colores[0];
    boton.dataset.color = 0;
  } else if (boton.dataset.color < colores.length - 1) {
    //Siguientes veces que le hago click al ball
    document.getElementById(boton.id).style.backgroundColor =
      colores[Number(boton.dataset.color) + 1];
    boton.dataset.color = Number(boton.dataset.color) + 1;
  } else {
    //Ultimo click al ball, vuelvo a la posicion 0
    document.getElementById(boton.id).style.backgroundColor = colores[0];
    boton.dataset.color = 0;
  }
  console.log(boton.dataset.color);
};

const checkIntento = () => {
  //Primero chequeo el intento y reviso lo que hay con los colores
  let lastBall1 = document.getElementById(`ball${numeroBoton - 4}`);
  let lastBall2 = document.getElementById(`ball${numeroBoton - 3}`);
  let lastBall3 = document.getElementById(`ball${numeroBoton - 2}`);
  let lastBall4 = document.getElementById(`ball${numeroBoton - 1}`);
  checkColores(lastBall1, lastBall2, lastBall3, lastBall4);
  //Si el intento es fallido, incremento la cantidad de intentos,
  //deshabilito los botones y agrego otro nuevo article
  let botones = document.getElementsByClassName("botonCheckIntento");
  intentosRealizados++;

  if (intentosRealizados < cantidadIntentos) {
    Array.from(botones).forEach((boton) => {
      boton.disabled = true;
    });
    rootSection.innerHTML += crearArticuloBoton(numeroBoton);
    numeroBoton += 4;
  }
  // lastBall1, lastBall2, lastBall3, lastBall4
};

const checkColores = (lastBall1, lastBall2, lastBall3, lastBall4) => {
  const intento = [lastBall1, lastBall2, lastBall3, lastBall4];
  // 0 no esta ni el color ni la posicion.
  // 1 esta el color pero no en la posicion.
  // 2, esta el color en la posicion correcta
  const respuesta = [0, 0, 0, 0];
  for (let i = 0; i < intento.length; i++) {
    for (let j = 0; j < coloresSolucion.length; j++) {
      if (colores[intento[i].dataset.color] == coloresSolucion[j]) {
        respuesta[i] = 1;
      }
      if (colores[intento[i].dataset.color] == coloresSolucion[j] && j == i) {
        respuesta[i] = 2;
        break;
      }
    }
  }
  let check1 = document.getElementById(
    `comprobador${lastBall1.dataset.identificador}`
  );
  let check2 = document.getElementById(
    `comprobador${lastBall2.dataset.identificador}`
  );
  let check3 = document.getElementById(
    `comprobador${lastBall3.dataset.identificador}`
  );
  let check4 = document.getElementById(
    `comprobador${lastBall4.dataset.identificador}`
  );
  let checks = [check1, check2, check3, check4];
  pintarChecks(checks, respuesta);
};

const pintarChecks = (checks, respuesta) => {
  for (let i = 0; i < respuesta.length; i++) {
    if (respuesta[i] == 0) {
      checks[i].style.backgroundColor = "red";
    } else if (respuesta[i] == 1) {
      checks[i].style.backgroundColor = "yellow";
    }
    if (respuesta[i] == 2) {
      checks[i].style.backgroundColor = "green";
    }
  }
  revisarIntento(respuesta);
};

const revisarIntento = (respuesta) => {
  if (elJugadorGano(respuesta)) {
    let sesion = JSON.parse(window.sessionStorage.getItem("sesion"));
    sesion.finalizacion = "ganador";

    sesion.coloresSolucion = coloresSolucion;
    window.sessionStorage.setItem("sesion", JSON.stringify(sesion));
    window.location.href = "./finalPartida.html";
  }
  if (intentosRealizados == cantidadIntentos - 1) {
    let sesion = JSON.parse(window.sessionStorage.getItem("sesion"));
    sesion.finalizacion = "perdedor";
    sesion.coloresSolucion = coloresSolucion;
    window.sessionStorage.setItem("sesion", JSON.stringify(sesion));
    window.location.href = "./finalPartida.html";
  }
};

const elJugadorGano = (respuesta) => {
  for (let i = 0; i < respuesta.length; i++) {
    if (respuesta[i] !== 2) {
      return false;
    }
  }
  return true;
};
const NuevoJuego = () => {
  window.sessionStorage.setItem("sesion", "");
  window.location.href = "../index.html";
};

InicioPagina();
