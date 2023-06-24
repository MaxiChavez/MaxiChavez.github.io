let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;

  let dificult = document.getElementById("select-dificultad");
  let value = dificult.value;
  let text = dificult.options[dificult.selectedIndex].text;
  console.log(text);
  let nombreDificultad = {
    nombre: name,
    dificultad: text,
  };
  sessionStorage.setItem("sesion", JSON.stringify(nombreDificultad));

  window.location.href = "../Mastermind/pages/parametros.html";
});

// var selectedOption = this.options[select.selectedIndex];
//     console.log(selectedOption.value + ': ' + selectedOption.text)

//     var e = document.getElementById("ddlViewBy");
// var value = e.value;
// var text = e.options[e.selectedIndex].text;
const developer = "MaxiChavez|||MaxiGamble => GitHub";

console.log("Desarrollado por: " + developer);
