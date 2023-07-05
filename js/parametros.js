let dificultad = JSON.parse(sessionStorage.sesion).dificultad;
console.log(dificultad);
let arrayColores = [];

const generarPickers = (cantidad) => {
  let colorPick = document.getElementById("containerPick");

  for (let i = 0; i < cantidad; i++) {
    let color = generateRandomColor();
    let divcolor = `<div class="col d-flex">
    <input id="pick${i}" data-numero="${i}"class="input-color" type="color" value="${color}" onchange ="updateColor(this)" />
    </div>`;
    // let divcolor = `<div class="col d-flex">
    // //     <input id="pick${i}" class="input-color" type="color" value="${color}" />
    // //     </div>`;
    arrayColores[i] = color;
    colorPick.innerHTML += divcolor;
  }
};

const updateColor = (obj) => {
  document.getElementById(obj.id).defaultValue = `${obj.value}`;
  arrayColores[obj.dataset.numero] = `${obj.value}`;
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

const jugar = () => {
  let dataSesion = JSON.parse(sessionStorage.getItem("sesion"));
  dataSesion.colores = arrayColores;
  sessionStorage.setItem("sesion", JSON.stringify(dataSesion));
  window.location.href = "../pages/mastermind.html";
};

function generateRandomColor() {
  // Generar valores aleatorios para los componentes RGB
  var r = Math.floor(Math.random() * 256); // Valores entre 0 y 255
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Convertir los componentes RGB a formato hexadecimal
  var hexR = r.toString(16).padStart(2, "0"); // Convertir a hexadecimal y rellenar con ceros si es necesario
  var hexG = g.toString(16).padStart(2, "0");
  var hexB = b.toString(16).padStart(2, "0");

  // Combinar los componentes en un único valor hexadecimal
  var hexColor = "#" + hexR + hexG + hexB;

  return hexColor;
}
