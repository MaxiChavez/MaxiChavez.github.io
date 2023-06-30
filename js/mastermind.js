let datosJuego = JSON.parse(sessionStorage.sesion);

let dificultad = datosJuego.dificultad;
let colores = datosJuego.colores;
let nombreJugador = datosJuego.nombre;
let coloresSolucion = [];
let numeroBoton = 0;
let cantidadIntentos;
let intentosRealizados = 0;
let rootSection = document.getElementById("section-bolas");

const crearArticuloBoton = (id) => {
  return `<article class= "carta">
  <div id="container" class="container">
    <div id="containerBolas" class="containerBolas">
      <div id = "ball${id}" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${
        id + 1
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${
        id + 2
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "ball${
        id + 3
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
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
};

const switchColor = (boton) => {
  if (boton.dataset.color < colores.length) {
    document.getElementById(boton.id).style.backgroundColor =
      colores[Number(boton.dataset.color) + 1];
    console.log(boton.dataset.color);
    boton.dataset.color = Number(boton.dataset.color) + 1;
  } else {
    document.getElementById(boton.id).style.backgroundColor = colores[0];
    boton.dataset.color = 0;
  }

  console.log(boton.dataset.color);
};

const checkIntento = () => {
  //Primero chequeo el intento y realizo lo que hay con los colores
  let lastBall1 = document.getElementById(`ball${numeroBoton - 4}`).dataset
    .color;
  let lastBall2 = document.getElementById(`ball${numeroBoton - 3}`).dataset
    .color;
  let lastBall3 = document.getElementById(`ball${numeroBoton - 2}`).dataset
    .color;
  let lastBall4 = document.getElementById(`ball${numeroBoton - 1}`).dataset
    .color;
  CheckColores(lastBall1, lastBall2, lastBall3, lastBall4);
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
};
const CheckColores = (color1, color2, color3, color4) => {
  console.log(coloresSolucion.indexOf(colores[color1]));
  console.log(coloresSolucion.indexOf(colores[color2]));
  console.log(coloresSolucion.indexOf(colores[color3]));
  console.log(coloresSolucion.indexOf(colores[color4]));
};
InicioPagina();
