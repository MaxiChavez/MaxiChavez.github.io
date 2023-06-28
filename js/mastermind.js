let datosJuego = JSON.parse(sessionStorage.sesion);

let dificultad = datosJuego.dificultad;
let colores = datosJuego.colores;
let nombreJugador = datosJuego.nombre;
let numeroBoton = 0;
let cantidadIntentos;
let intentosRealizados = 0;
let rootSection = document.getElementById("section-bolas");

const crearArticuloBoton = (id) => {
  return `<article id="carta">
  <div id="container" class="container">
    <div id="containerBolas" class="containerBolas">
      <div id = "${id}" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "${
        id + 1
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "${
        id + 2
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
      <div id = "${
        id + 3
      }" data-color="-1" onclick="switchColor(this)" class="ball"></div>
    </div>
    <div id="containerComprobador" class="containerComprobador">
      <div class="row">
        <div class="comprobador"></div>
        <div class="comprobador"></div>
      </div>
      <div class="row">
        <div class="comprobador"></div>
        <div class="comprobador"></div>
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
  crearSolucion(colores);
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

InicioPagina();
