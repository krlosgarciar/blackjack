(() => {
  "use strict";
  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0,
    puntosIA = 0;

  // todo Referencia HTML

  const btnNuevo = document.querySelector("#btnNuevo");
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const marcadores = document.querySelectorAll("span");
  const addCard = document.querySelectorAll(".cartas");

  // ? Creación del deck
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(`${i}${tipo}`);
      }
    }

    for (const esp of especiales) {
      for (const tipo of tipos) {
        deck.push(`${esp}${tipo}`);
      }
    }
    deck = _.shuffle(deck);

    // * Otro metedo para hacer shuffle |Por probar|
    // let shuffleDeck = deck.sort((a, b) => 0.5 - Math.random());
    // console.log(shuffleDeck);

    return deck;
  };

  crearDeck();

  // ? Tomar una carta

  const perdirCarta = () => {
    if (deck.length === 0) {
      throw "No hay más cartas en el deck";
    }
    deck = _.shuffle(deck);
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
  };

  // ? Extraer valor de la carta

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // * Turno de la IA
  const turnoIA = (puntosMinimos) => {
    do {
      const carta = perdirCarta();

      puntosIA = puntosIA + valorCarta(carta);

      marcadores[1].innerText = puntosIA;

      const imgCarta = document.createElement("img");
      imgCarta.classList.add("carta");
      imgCarta.src = `assets/cartas/${carta}.png`;

      addCard[1].append(imgCarta);
    } while (puntosMinimos > puntosIA && puntosMinimos <= 21);

    setTimeout(() => {
      (puntosMinimos > puntosIA && puntosMinimos <= 21) || puntosIA > 21
        ? alert("¡El jugador Gana!")
        : puntosMinimos > 21 || (puntosMinimos < puntosIA && puntosIA <= 21)
        ? alert("¡La IA es el Ganador!")
        : alert("¡Empatados!");
    }, 10);
  };

  // ? Eventos

  // * Pedir

  btnPedir.addEventListener("click", () => {
    const carta = perdirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    marcadores[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;

    addCard[0].append(imgCarta);

    if (puntosJugador > 21) {
      console.warn("Lo siento, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoIA(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, ¡Enhorabuena!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoIA(puntosJugador);
    }
  });

  // * Detener

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoIA(puntosJugador);
  });

  // * Nuevo Juego

  btnNuevo.addEventListener("click", () => {
    console.clear();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosIA = 0;
    marcadores[0].innerText = 0;
    marcadores[1].innerText = 0;
    addCard[0].innerHTML = "";
    addCard[1].innerHTML = "";
    // * Metodo rudimentario para eliminar elementos
    /* const removeCard = document.querySelectorAll(".carta");
    for (let i = 0; i <= removeCard.length - 1; i++) {
      removeCard[i].remove("img");
    } */
    crearDeck();
  });
})();
