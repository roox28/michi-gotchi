const piedra = document.querySelector("#piedra");
const papel = document.querySelector("#papel");
const tijera = document.querySelector("#tijera");

const sonidoClick = new Audio("Recursos/sonido-boton.wav");
function reproducirSonido() {
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

const pantalla = document.querySelector(".pantalla");
pantalla.style.display = "flex";
pantalla.style.flexDirection = "column";
pantalla.style.gap = "20px";
pantalla.style.paddingTop = "15px";


pantalla.innerHTML = `
   <p class="textoJuguemos">Michi listo, a jugar!</p>
  <img src="Recursos/michi.svg" alt="Michi" class="michiJuguemos">
`;


let partidaMichi = [
  `<img src="Recursos/tijeraMichi.svg" alt="Tijera" class="iconoMichi">`,
  `<img src="Recursos/papelMichi.svg" alt="Papel" class="iconoMichi">`,
  `<img src="Recursos/piedraMichi.svg" alt="Piedra" class="iconoMichi">`
];

const opciones = ["piedra", "papel", "tijera"];

function resultadoJuego(miEleccion, eleccionMichi) {
  if (
    (miEleccion === "piedra" && eleccionMichi === "tijera") ||
    (miEleccion === "papel" && eleccionMichi === "piedra") ||
    (miEleccion === "tijera" && eleccionMichi === "papel")
  ) {
    return "¡Ganaste!";
  } else if (
    (miEleccion === "piedra" && eleccionMichi === "papel") ||
    (miEleccion === "papel" && eleccionMichi === "tijera") ||
    (miEleccion === "tijera" && eleccionMichi === "piedra")
  ) {
    return "Perdiste";
  } else {
    return "Empataron";
  }
}


let puntajeVos = document.querySelector(".botonPuntajeVos");
let puntajeCompu = document.querySelector(".botonPuntajeMichi");
let puntajeJugador = 0;
let puntajeMichi = 0;

const finDeRondas = 3;
let intentos = 0

puntajeVos.innerHTML = `<p class="puntajeTexto">${puntajeJugador}</p>`;
puntajeCompu.innerHTML = `<p class="puntajeTexto">${puntajeMichi}</p>`;


piedra.addEventListener("click", function () {
  reproducirSonido();

  let random = Math.floor(Math.random() * 3);

  if (random === 0) {
    eleccion = "tijera";
  } else if (random === 1) {
    eleccion = "papel";
  } else {
    eleccion = "piedra";
  }

  let miEleccion = "piedra";
  let eleccionMichi = eleccion;

  let resultado = resultadoJuego(miEleccion, eleccionMichi);

  pantalla.innerHTML = `
      <p class="textoElegiste">Elegiste piedra</p>
      <img src="Recursos/piedraHumano.svg" alt="Piedra" class="iconoHumano">
        <div class="contenedorMichi">
          <p class="textoEligio">Michi eligió ${eleccion}</p>
          ${partidaMichi[random]}
        </div>
      <p class="resultadoFinal">${resultado}</p>`;

  actualizarPuntajes(resultado);
});

papel.addEventListener("click", function () {
  reproducirSonido();

  let random = Math.floor(Math.random() * 3);

  if (random === 0) {
    eleccion = "tijera";
  } else if (random === 1) {
    eleccion = "papel";
  } else {
    eleccion = "piedra";
  }

  let miEleccion = "papel";
  let eleccionMichi = eleccion;

  let resultado = resultadoJuego(miEleccion, eleccionMichi);

  pantalla.innerHTML = `
      <p class="textoElegiste">Elegiste papel</p>
      <img src="Recursos/papelHumano.svg" alt="Papel" class="iconoHumano">
        <div class="contenedorMichi">
          <p class="textoEligioPapel">Michi eligió ${eleccion}</p>
          ${partidaMichi[random]}
        </div>
      <p class="resultadoFinal">${resultado}</p>`;

  actualizarPuntajes(resultado);
});

tijera.addEventListener("click", function () {
  reproducirSonido();

  let random = Math.floor(Math.random() * 3);

  let eleccion;
  if (random === 0) {
    eleccion = "tijera";
  } else if (random === 1) {
    eleccion = "papel";
  } else {
    eleccion = "piedra";
  }

  let miEleccion = "tijera";
  let eleccionMichi = eleccion;

  let resultado = resultadoJuego(miEleccion, eleccionMichi);

  pantalla.innerHTML = ` 
      <p class="textoElegiste">Elegiste tijera</p>
      <img src="Recursos/tijeraHumano.svg" alt="Tijera" class="iconoHumano">
        <div class="contenedorMichi">
          <p class="textoEligioTijera">Michi eligió ${eleccion}</p>
          ${partidaMichi[random]}
        </div>
      <p class="resultadoFinal">${resultado}</p>`;

  actualizarPuntajes(resultado);
});


function actualizarPuntajes(resultado) {
  if (resultado === "¡Ganaste!") {
    puntajeJugador++;
  } else if (resultado === "Perdiste") {
    puntajeMichi++;
  } else {
    puntajeMichi++;
    puntajeJugador++;
  }
  intentos++;

  puntajeVos.innerHTML = `<p class="puntajeTexto">${puntajeJugador}</p>`;
  puntajeCompu.innerHTML = `<p class="puntajeTexto">${puntajeMichi}</p>`;


  if (intentos >= finDeRondas) {
    let resultadoFinalJuego;

    if (puntajeJugador > puntajeMichi) {
      resultadoFinalJuego = "¡Ganaste el juego!";
    } else if (puntajeMichi > puntajeJugador) {
      resultadoFinalJuego = "Perdiste el juego";
    } else {
      resultadoFinalJuego = "Empataron el juego";
    }
    const elementoResultadoRonda = document.querySelector(".resultadoFinal");

    if (elementoResultadoRonda) {
      elementoResultadoRonda.textContent = resultadoFinalJuego;
    }

    piedra.disabled = true;
    papel.disabled = true;
    tijera.disabled = true;

  }
}


let reset = document.querySelector("#reset");

reset.addEventListener("click", function () {
  botonReset();
})

function botonReset() {
  reproducirSonido();

  intentos = 0;
  puntajeJugador = 0;
  puntajeMichi = 0;

  puntajeVos.innerHTML = `<p class="puntajeTexto">${puntajeJugador}</p>`;
  puntajeCompu.innerHTML = `<p class="puntajeTexto">${puntajeMichi}</p>`;

  pantalla.innerHTML = `
   <p class="textoJuguemos">Michi listo, a jugar!</p>
   <img src="Recursos/michi.svg" alt="Michi" class="michiJuguemos">
  `;

  piedra.disabled = false;
  papel.disabled = false;
  tijera.disabled = false;
}