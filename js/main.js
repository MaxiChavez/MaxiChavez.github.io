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
  //Cargo nombre y dificultad del sesion Storage////////
  window.location.href = "../Mastermind/pages/parametros.html";
});

const developer = "MaxiChavez|||MaxiGamble => GitHub";

console.log("Desarrollado por: " + developer);
