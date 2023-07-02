let sesion = JSON.parse(window.sessionStorage.getItem("sesion"));
let titulo = document.getElementById("titulo");
let puntaje = document.getElementById("puntaje");
let resultadoFinal = document.getElementById("resultadoFinal");

const crearArticuloBoton = (color1, color2, color3, color4) => {
  return `<article class= "carta">
    <div id="container" class="container">
      <div id="containerBolas" class="containerBolas">
        <div data-color="-1"  class="ball" style="background-color:${color1};"></div>
        <div data-color="-1"  class="ball" style="background-color:${color2};"></div>
        <div data-color="-1"  class="ball" style="background-color:${color3};"></div>
        <div data-color="-1"  class="ball" style="background-color:${color4};"></div>
      </div>
    </div>
    </article>`;
};

const RenderizarResultado = () => {
  if (sesion.finalizacion == "perdedor") {
    titulo.innerHTML = `Has perdido, ${sesion.nombre}`;
  }
  if (sesion.finalizacion == "ganador") {
    titulo.innerHTML = `Felicitaciones, ${sesion.nombre}! Has ganado`;
  }
  resultadoFinal.innerHTML += crearArticuloBoton(
    sesion.coloresSolucion[0],
    sesion.coloresSolucion[1],
    sesion.coloresSolucion[2],
    sesion.coloresSolucion[3]
  );
};

const NuevoJuego = () => {
  window.sessionStorage.setItem("sesion", "");
  window.location.href = "../../";
};

RenderizarResultado();
