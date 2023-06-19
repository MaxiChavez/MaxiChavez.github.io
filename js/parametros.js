let dificultad = JSON.parse(sessionStorage.sesion).dificultad;
console.log(dificultad);
let arrayColores = [];

const generarPickers = (cantidad) => {
  let colorPick = document.getElementById("containerPick");

  for (let i = 1; i <= cantidad; i++) {
    let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    arrayColores.push(color);
    let divcolor = `<div class="col d-flex">
    <input id="pick${i}" class="input-color" type="color" value="${color}" />
    </div>`;

    colorPick.innerHTML += divcolor;
  }
};

switch (dificultad) {
  case "Fácil":
    generarPickers(4);
    break;

  case "Intermedio":
    generarPickers(5);
    break;

  default:
    "Dificil";
    generarPickers(6);
    break;
}
